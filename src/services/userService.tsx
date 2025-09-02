import {
  Actor,
  Agent,
  HttpAgent,
  HttpAgentOptions,
  Identity,
} from "@dfinity/agent";
import { idlFactory as UserIDLFactory } from "../candid/js/user.did.js";
import {
  _SERVICE as UserActor,
  UserPayload,
  UserRequestPayload,
  GetFileOutputType,
  Result_2,
} from "../candid/ts/user.did.js";

/**
 * A thin wrapper around a user‑canister actor that hides the candid variant
 * plumbing and takes care of trivial file‑handling quirks.
 */
class UserActorService {
  private userActor?: UserActor;

  /* ────────────────────────────────────────────────────────── Init helpers ── */
  /** Init when an `HttpAgent` is already available (e.g. from auth‑flow). */
  async initWithAgent(canisterId: string, agent: Agent): Promise<boolean> {
    try {
      if (process.env.NODE_ENV === "development") {
        await agent.fetchRootKey();
      }
      this.userActor = Actor.createActor<UserActor>(UserIDLFactory, {
        agent,
        canisterId,
      });
      return true;
    } catch {
      return false;
    }
  }

  /** Init by building a fresh `HttpAgent` (optionally using an `Identity`). */
  async init(
    canisterId: string,
    identity?: Identity,
    host: string = "https://ic0.app",
  ): Promise<boolean> {
    try {
      const options: HttpAgentOptions = { host };
      if (identity) options.identity = identity;
      const agent = new HttpAgent(options);
      if (process.env.NODE_ENV === "development") {
        await agent.fetchRootKey();
      }
      this.userActor = Actor.createActor<UserActor>(UserIDLFactory, {
        agent,
        canisterId,
      });
      return true;
    } catch {
      return false;
    }
  }

  /** Ad‑hoc helper that returns a *temporary* actor (does not mutate `this`). */
  private async getDynamicActor(
    canisterId: string,
    identity?: Identity,
    host: string = "https://ic0.app",
  ): Promise<UserActor> {
    const options: HttpAgentOptions = { host };
    if (identity) options.identity = identity;
    const agent = new HttpAgent(options);
    if (process.env.NODE_ENV === "development") {
      await agent.fetchRootKey();
    }
    return Actor.createActor<UserActor>(UserIDLFactory, {
      agent,
      canisterId,
    });
  }

  /* ─────────────────────────────────────────────────────── Actor accessors ── */
  get actor(): UserActor | undefined {
    return this.userActor;
  }

  /* ──────────────────────────────────────────────────────────── User CRUD ── */
  /** Return *our* user profile or `undefined` when none exists. */
  async getUser(): Promise<UserPayload | undefined> {
    if (!this.userActor) return undefined;

    const response = await this.userActor.getUser(); // [] | [UserPayload]
    if (response.length === 0) return undefined;

    const [user] = response;

    // Resolve profile/cover images into byte‑payloads for convenience.
    const fetches: Promise<GetFileOutputType>[] = [];
    const indexMap: number[] = [];
    if (user.profilepic) {
      indexMap.push(0);
      fetches.push(this.userActor.getFile(user.profilepic));
    }
    if (user.coverphoto) {
      indexMap.push(1);
      fetches.push(this.userActor.getFile(user.coverphoto));
    }

    const files = await Promise.all(fetches);

    files.forEach((fileRes, i) => {
      if (fileRes.length === 0) return;
      const target = indexMap[i];
      const fileId = fileRes[0].fileId;
      if (target === 0) {
        user.profilepic = fileId;
      } else if (target === 1) {
        user.coverphoto = fileId;
      }
    });

    return user;
  }

  /** Upload a `File` or `Blob` to the canister and return its file‑id. */
  private async saveFileToCanister(file: File): Promise<string> {
    if (!this.userActor) throw new Error("User actor not initialised");

    const buffer = new Uint8Array(await file.arrayBuffer());
    return this.userActor.saveFile({
      fileName: file.name,
      fileType: file.type || "application/octet-stream",
      fileDataObject: buffer,
    });
  }

  /** Upsert the current user. Returns the canister‑generated user‑ID. */
  async upsertUser(data: {
    bio: [string];
    categories?: string[];
    timezone: string;
    firstname: string;
    country: string;
    username: string;
    email: string;
    lastname: string;
    introductionvideolink?: string;
    profilepic?: File | null;
    coverphoto?: File | null;
  }): Promise<string | undefined> {
    if (!this.userActor) return undefined;

    // Upload files first, because we need their resulting IDs.
    let profilePicId = "";
    let coverPhotoId = "";
    if (data.profilepic) {
      profilePicId = await this.saveFileToCanister(data.profilepic);
    }
    if (data.coverphoto) {
      coverPhotoId = await this.saveFileToCanister(data.coverphoto);
    }

    const payload: UserRequestPayload = {
      principal_id: [],
      bio: data.bio ? data.bio : [],
      categories: data.categories?.length ? [data.categories] : [],
      timezone: data.timezone,
      firstname: data.firstname,
      country: data.country,
      username: data.username,
      email: data.email,
      profilepic: profilePicId ? [profilePicId] : [],
      coverphoto: coverPhotoId ? [coverPhotoId] : [],
      lastname: data.lastname,
      introduction_video_link: data.introductionvideolink
        ? [data.introductionvideolink]
        : [],
    };

    return this.userActor.upsertUser(payload);
  }

  /* ───────────────────────────────────────────────────────── Event helpers ── */
  /** Fetch *all* events metadata. The IDL exposes no user‑filtering variant. */
  async getAllEventsMetadata(): Promise<Result_2> {
    if (!this.userActor) throw new Error("User actor not initialised");
    return this.userActor.getAllEventsMetadata();
  }

  /* ──────────────────────────────────────────────────────────── Utilities ── */
  /** Convenience helper for generating raw‑file URLs. */
  getUserImageUrl(
    userCanisterId: string | undefined,
    fileId: string,
  ): string | undefined {
    if (!fileId || !userCanisterId) return undefined;
    return `https://${userCanisterId}.raw.icp0.io/d3?file_id=${fileId}`;
  }

  /* ─────────────────────────────────────────────────── External user lookup ── */
  /**
   * Fetch a user record that belongs to *another* user‑canister. The backend
   * currently exposes a `getUserForEventCanister` method that takes a string
   * identifier (user‑id) and returns a light‑weight `EventUserResponsePayload`.
   * If you need additional lookup strategies, consider extending the backend
   * interface instead of calling non‑existent methods.
   */
  async getUserForEventCanister(
    userId: string,
    canisterId: string,
  ) {
    const actor = await this.getDynamicActor(canisterId);
    return actor.getUserForEventCanister(userId);
  }
}

export const userActorServiceInstance = new UserActorService();

export default userActorServiceInstance;
