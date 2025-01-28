import * as React from 'react'
import Auth from 'components/Modals'
import LogIn from 'components/Modals/LogIn'
import Welcome from 'components/Modals/Welcome'
import Header from 'components/Header'
import Spinner from 'components/Spinner'
import Congrates from 'components/Modals/Congrates'
import SignUp from 'components/Modals/SignUp'
import { useAppDispatch } from 'reduxStore/hooks'
import { ConnectWallet, useIdentityKit } from '@nfid/identitykit/react'
import { setLoader } from 'reduxStore/auth/authAction'
import { useNavigate } from 'react-router'

import EventCard from './EventCard'

import user1 from 'assets/img/landing/user1.png'
import user2 from 'assets/img/landing/user2.png'
import user3 from 'assets/img/landing/user3.png'
import user4 from 'assets/img/landing/user4.png'
import user5 from 'assets/img/landing/user5.png'
import user6 from 'assets/img/landing/user6.png'
import user7 from 'assets/img/landing/user7.png'

import event1 from 'assets/img/landing/event1.png'
import event2 from 'assets/img/landing/event2.png'
import event3 from 'assets/img/landing/event3.png'

import testimonial2 from 'assets/img/landing/testimonial2.png'
import testimonial3 from 'assets/img/landing/testimonial3.png'

import footeruser1 from 'assets/img/landing/footeruser1.png'
import footeruser2 from 'assets/img/landing/footeruser2.png'
import footeruser3 from 'assets/img/landing/footeruser3.png'
import footeruser4 from 'assets/img/landing/footeruser4.png'

import calendar from 'assets/img/landing/calendar.png'
import feature1 from 'assets/img/landing/feature1.png'
import feature2 from 'assets/img/landing/feature2.png'
import feature3 from 'assets/img/landing/feature3.png'
import groupuser from 'assets/img/landing/groupuser.png'
import emailbg from 'assets/img/landing/emailbg.png'

import calendarPlain from 'assets/img/landing/CalendarPlain.png'

import PlaySvg from 'assets/img/landing/Play.svg'
import HeartSvg from 'assets/img/landing/HeartSVG.svg'
import ChatBubbleSvg from 'assets/img/landing/ChatBubbleSVG.svg'
import TicketSvg from 'assets/img/landing/TicketSVG.svg'
import FilterSvg from 'assets/img/landing/FilterSVG.svg'
import {
  ChevronLeft,
  ChevronRight,
  PlayArrow,
  PlayCircle,
  PlayCircleFilled,
} from '@mui/icons-material'
import FAQItem from 'components/FAQItem'
import indexActorServiceInstance from 'services/indexService'
import { HttpAgent } from '@dfinity/agent'
import styles from './home.module.scss'

import _ from 'lodash'
import Welcome2 from 'components/Modals/Welcome2'
import VerifyPayment from 'components/Modals/VerifyPayment'
import SuccessPayment from 'components/Modals/SuccessPayment'
import LoginInfo from 'components/Modals/LoginInfo'

function PrimaryCTA(
  props: React.PropsWithChildren<{ onClick: React.MouseEventHandler }>,
) {
  return (
    <button className={styles.primaryCTA} onClick={props.onClick}>
      <span>{props.children}</span>
    </button>
  )
}

function SecondaryCTA(props: React.PropsWithChildren) {
  // return null
  return (
    <button className={styles.secondaryCTA}>
      <span>{props.children}</span>
    </button>
  )
}

function BlueText(props: React.PropsWithChildren) {
  return <span className={styles.blueText}>{props.children}</span>
}

function HeadingText(props: React.PropsWithChildren) {
  return <span className={styles.headingText}>{props.children}</span>
}

interface CommonProps {
  handleLogin: () => void
}

function Hero({ handleLogin }: CommonProps) {
  return (
    <div className={styles.sectionOuterContainer}>
      <div className={styles.sectionContainer}>
        <div className="relative flex flex-col justify-center items-center gap-[20px] mx-auto my-0 pt-[107px]">
          <BlueText>masterclasses platform</BlueText>
          <div className="flex flex-col items-center gap-[20px]">
            <HeadingText>Enhance your experience today</HeadingText>
            <p className={styles.bodyText1}>
              Find out what&apos;s possible with KonectA! Connect with creators,
              educators, artists, therapists, lawyers, lecturers and much more.
              Additionally, interact with assistant users from diverse
              backgrounds through video/audio chat and writing.
            </p>
          </div>
          <div className="flex justify-center items-center gap-[16px] md:gap-[20px] mt-[26px]">
            <PrimaryCTA onClick={handleLogin}>Get started now</PrimaryCTA>
            <SecondaryCTA>Continue as guest</SecondaryCTA>
          </div>
          <div className="relative flex flex-col flex-nowrap justify-center items-center gap-[16px] mt-[40px]">
            <span className={styles.bodyText2}>
              Join over 800+ creators and viewers
            </span>
            <div className="relative flex flex-nowrap items-start gap-[-3px] opacity-70 shrink-0">
              {[user1, user2, user3, user4, user5, user6, user7].map((a, i) => {
                return (
                  <img
                    key={i}
                    src={a}
                    className="mx-[-3px] rounded-full w-[32px] h-[32px]"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Calendar() {
  return (
    <div className={styles.sectionOuterContainer}>
      <div
        className={`${styles.sectionContainer} pr-[0px] md:pr-auto mt-[100px]`}
      >
        <div className="relative md:w-full md:h-[80vh]">
          <img
            src={calendar}
            className="object-left w-[800px] md:w-full h-[400px] md:h-full object-cover md:object-contain md:object-center"
          />
        </div>
      </div>
      <div className="md:bottom-0 z-10 absolute-center calendar-shadow w-full h-[400px] md:h-[80vh]" />
    </div>
  )
}

function LiveEvents({ handleLogin }: CommonProps) {
  return (
    <div className={styles.sectionOuterContainer}>
      <div className={styles.sectionContainer}>
        <div className="flex flex-col gap-[40px] mt-[30px] md:mt-[30px] text-white">
          <div className="flex flex-row justify-between items-center">
            <p className="font-[500] text-[28px]">Now on live</p>
            <div className="flex flex-row justify-start items-center gap-[10px]">
              <button className="btn-icon btn-secondary">
                <ChevronLeft />
              </button>
              <button className="btn-icon btn-secondary">
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center gap-[20px] pb-[48px] overflow-x-auto">
            <EventCard
              cardCreator="Shasha Howell"
              cardTitle="The Art of Stand-Up Comedy"
              categories={['Entertainment', 'Stand up', 'Comedy']}
              time="Saturday, April 17th at 9pm"
              creator="Jeremy Pope"
              img={event1}
              price="Free"
              title="The Art of Stand-up Comedy"
            />
            <EventCard
              cardCreator="Shasha Howell"
              cardTitle="Unlocking Leadership Potential"
              categories={['Professional', 'Leadership', 'Management']}
              time="Saturday, April 17th at 9pm"
              creator="Jeremy Pope"
              img={event2}
              price="19.99 ICP"
              title="Unlocking Your Leadership Potential"
            />
            <EventCard
              cardCreator="Shasha Howell"
              cardTitle="Effective Teaching Strategies"
              categories={['Educational', 'Instruction']}
              time="Saturday, April 17th at 9pm"
              creator="Jeremy Pope"
              img={event3}
              price="19.99 ICP"
              title="Effective Teaching Strategies"
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-[24px] mt-[30px] md:mt-[80px]">
            <p className="text-[white]/[80%]">View more videos on KonectA</p>
            <div className="flex flex-row gap-[16px] md:gap-[20px]">
              <PrimaryCTA onClick={handleLogin}>Get Started Now</PrimaryCTA>
              <SecondaryCTA>Continue as guest</SecondaryCTA>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CategorySectionProps {
  category: string
  topics: Array<{ label: string; sublabel: string }>
}

function CategorySection({ category, topics }: CategorySectionProps) {
  return (
    <section className="flex flex-col gap-[16px] md:gap-[32px]">
      <p className="font-[500] text-[28px]">{category}</p>
      <ul className="flex flex-col gap-[16px] md:gap-[24px]">
        {topics.map((tp) => {
          return (
            <li key={tp.label} className="flex flex-col gap-[6px] text-[18px]">
              <p
                className="text-[#2AB272] underline"
                style={{ color: `var(--color-${category.toLowerCase()})` }}
              >
                {tp.label}
              </p>
              <p className="text-[#807B87]">{tp.sublabel}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function CategoryTopics() {
  return (
    <div className={styles.sectionOuterContainer}>
      <div className={styles.sectionContainer}>
        <div className="flex flex-col gap-[68px] my-[170px] text-left text-white">
          <div className="flex flex-col justify-start items-start gap-[12px]">
            <BlueText>top categories</BlueText>
            <HeadingText>Featured topics by category</HeadingText>
          </div>
          <div className="flex md:flex-row flex-col justify-between gap-[40px] md:gap-[20px]">
            <CategorySection
              category="Entertainment"
              topics={[
                {
                  label: 'Acting and Performance',
                  sublabel: '2,679 masterclasses',
                },
                {
                  label: 'Cinematography',
                  sublabel: '2,679 masterclasses',
                },
                {
                  label: 'Music Production',
                  sublabel: '2,679 masterclasses',
                },
              ]}
            />
            <CategorySection
              category="Educational"
              topics={[
                {
                  label: 'Technology Integration',
                  sublabel: '2,679 masterclasses',
                },
                {
                  label: 'Strategic Leadership',
                  sublabel: '2,679 masterclasses',
                },
                {
                  label: 'Data-Driven Instruction',
                  sublabel: '2,679 masterclasses',
                },
              ]}
            />
            <CategorySection
              category="Professional"
              topics={[
                {
                  label: 'Personal Branding',
                  sublabel: '2,679 masterclasses',
                },
                {
                  label: 'Career Advancement',
                  sublabel: '2,679 masterclasses',
                },
                {
                  label: 'Skill Enhancement',
                  sublabel: '2,679 masterclasses',
                },
              ]}
            />
            <CategorySection
              category="Talks"
              topics={[
                {
                  label: 'Communication',
                  sublabel: '2,679 masterclasses',
                },
                {
                  label: 'Presentation',
                  sublabel: '2,679 masterclasses',
                },
                {
                  label: 'Career Growth',
                  sublabel: '2,679 masterclasses',
                },
              ]}
            />
          </div>
          <div>
            <SecondaryCTA>Explore more topics</SecondaryCTA>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  image: string
  subTitle: string
}

function FeatureCard({ title, subTitle, image }: FeatureCardProps) {
  return (
    <div className="flex flex-col flex-1 gap-[60px] border-[1px] border-[white]/10 bg-gradient-to-t from-[white]/[3.7%] to-[white]/[0%] px-[24px] pt-[24px] pb-[24px] md:pb-[48px] rounded-[16px] text-[white] text-left">
      <img src={image} className="flex-1 object-contain" />
      <div className="flex flex-col justify-center items-start gap-[10px] text-white">
        <h2 className="font-['Montserrat'] font-[500] text-[22px]">{title}</h2>
        <p className="text-[#807B87] text-[16px]">{subTitle}</p>
      </div>
    </div>
  )
}

function AboutSection({ handleLogin }: CommonProps) {
  return (
    <div className={styles.sectionOuterContainer}>
      <div className={styles.sectionContainer}>
        <div
          id="aboutus"
          className="flex flex-col justify-center items-start md:items-center gap-[48px] md:gap-[82px] pb-[140px] md:pb-[200px] text-left md:text-center"
        >
          <div className="flex flex-col justify-center items-start md:items-center gap-[24px]">
            <BlueText>About us</BlueText>
            <div className="flex flex-col justify-center items-start md:items-center gap-[20px]">
              <HeadingText>Decentralized social media application</HeadingText>
              <p className={`${styles.bodyText1} text-left md:text-center`}>
                The features of KonectA focus on allowing users to easily find
                and connect with content creators and their desired content,
                providing a personalized experience that is tailored to their
                interests and preferences.
              </p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-[24px] md:gap-[20px]">
            <FeatureCard
              image={feature1}
              title={'Personal Calendar'}
              subTitle={
                'Plan your week according to your interests.  Our algorithm matches your selected day and time slot with relevant content creators.'
              }
            />
            <FeatureCard
              image={feature2}
              title={'Content Filter'}
              subTitle={
                'Customize the menu by applying filters based on language, course specialty, event time and day, and number of attendees.'
              }
            />
            <FeatureCard
              image={feature3}
              title={'Content Search'}
              subTitle={
                'Search for specific content like on YouTube  and schedule live events with creators in     your selected interests.'
              }
            />
          </div>
          <div className="flex flex-row gap-[16px] md:gap-[20px] md:hidden">
            <PrimaryCTA onClick={handleLogin}>Get Started Now</PrimaryCTA>
            <SecondaryCTA>Continue as guest</SecondaryCTA>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SmallFeatureCardProps {
  title: string
  subTitle: string
}

function SmallFeatureCard({ title, subTitle }: SmallFeatureCardProps) {
  return (
    <div className="flex flex-col gap-[4px] border-[1px] border-[white]/[10%] bg-gradient-to-b from-[white]/[5%] to-[white]/[0%] md:px-[40px] p-[20px] md:pt-[40px] md:pb-[52px] rounded-[16px]">
      <h2 className="font-[500] font-[Montserrat] text-[20px] md:text-[22px]">
        {title}
      </h2>
      <p className="text-[white]/[60%]">{subTitle}</p>
    </div>
  )
}

function FeaturesSection({ handleLogin }: CommonProps) {
  return (
    <div className={`${styles.sectionOuterContainer} radial-gradient`}>
      <div className={styles.sectionContainer}>
        <div
          id="features"
          className="relative py-[100px] w-full text-left text-white"
        >
          <div className="top-0 absolute w-full h-[1px] white-gradient"></div>
          <div className="bottom-0 absolute w-full h-[1px] white-gradient"></div>
          <div className="flex md:flex-row flex-col items-center gap-[78px] md:gap-[120px] w-full">
            <div className="flex flex-col flex-1 gap-[48px] md:gap-[40px]">
              <div className="flex flex-col gap-[20px]">
                <BlueText>Features</BlueText>
                <HeadingText>Unlock the full potential of KonectA</HeadingText>
                <p className="text-[white]/[60%]">
                  KonectA allows the same user to be a creator and a consumer of
                  content at the same time.
                </p>
              </div>
              <div className="flex flex-col gap-[24px] md:gap-[10px]">
                <SmallFeatureCard
                  title="Matchmaking"
                  subTitle="KonectA connects users and creators with the same interest, allowing users to select the profile that he/she likes the most from his/her matches that KonectA generates. "
                />
                <SmallFeatureCard
                  title="Chat functionality"
                  subTitle="A message chat will appear so that users can connect to the event beforehand, ask questions, and create expectations.   From these chats, new and exciting communities will be born."
                />
              </div>
              <div className="flex flex-row gap-[20px]">
                <PrimaryCTA onClick={handleLogin}>Get started now</PrimaryCTA>
                <SecondaryCTA>Continue as guest</SecondaryCTA>
              </div>
            </div>
            <div className="flex flex-col flex-1 items-center">
              <img
                src={groupuser}
                className="w-full md:w-[80%] h-full md:h-[80%] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ServiceStepProps {
  title: string
  icon: string
  image: string
  description: string
}

function ServiceStep({ title, icon, image, description }: ServiceStepProps) {
  return (
    <div className="relative flex flex-col gap-[10px] pb-[24px] md:pb-[0px] md:pl-[40px] border-b-[1px] border-b-[white]/10 md:border-b-[0px] border-l-[white]/10 md:border-l-[1px] text-left cursor-pointer group">
      <div className="group-hover:scale-y-100 md:block left-[0px] absolute hidden bg-[white] w-[1px] h-[100px] origin-top transition-all scale-y-0" />
      <div className="group-hover:scale-x-100 bottom-[0px] absolute md:hidden bg-[white] w-[100px] h-[1px] origin-left transition-all scale-x-0" />
      <img
        src={image}
        className="group-hover:flex hidden md:group-hover:hidden md:hidden pb-[24px]"
      />
      <div className="flex flex-row gap-[12px] text-white">
        <img src={icon} />
        <p className="font-[500] font-[Montserrat] text-[20px] md:text-[22px]">
          {title}
        </p>
      </div>
      <p className="group-hover:scale-y-100 group-hover:flex hidden opacity-0 group-hover:opacity-100 text-[#807B87] text-[16px]">
        {description}
      </p>
    </div>
  )
}

function HowItWorks({ handleLogin }: CommonProps) {
  return (
    <div className={styles.sectionOuterContainer}>
      <div className={styles.sectionContainer}>
        <div
          id="howitworks"
          className="flex flex-col justify-center items-center gap-[82px] py-[60px] md:py-[160px] w-full"
        >
          <div className="flex flex-col justify-center items-center gap-[20px]">
            <BlueText>How it works</BlueText>
            <HeadingText>Easy steps to use the service</HeadingText>
          </div>
          <div className="flex flex-row justify-between items-center gap-[80px] w-full">
            <div className="flex flex-col flex-1 gap-[70px]">
              <div className="flex flex-col gap-[38px]">
                <ServiceStep
                  title={'Content exploration'}
                  icon={PlaySvg}
                  description={
                    'Explore various types of content or create your own using Konnecta, a feature available on KonectA that includes video and audio chat capabilities.'
                  }
                  image={calendarPlain}
                />
                <ServiceStep
                  title={'Content Filter'}
                  icon={FilterSvg}
                  description={
                    'Explore various types of content or create your own using Konnecta, a feature available on KonectA that includes video and audio chat capabilities.'
                  }
                  image={calendarPlain}
                />
                <ServiceStep
                  title={'Chat Messaging'}
                  icon={ChatBubbleSvg}
                  description={
                    'Explore various types of content or create your own using Konnecta, a feature available on KonectA that includes video and audio chat capabilities.'
                  }
                  image={calendarPlain}
                />
                <ServiceStep
                  title={'Watch for free'}
                  icon={TicketSvg}
                  description={
                    'Explore various types of content or create your own using Konnecta, a feature available on KonectA that includes video and audio chat capabilities.'
                  }
                  image={calendarPlain}
                />
                <ServiceStep
                  title={'Share your feedback'}
                  icon={HeartSvg}
                  description={
                    'Explore various types of content or create your own using Konnecta, a feature available on KonectA that includes video and audio chat capabilities.'
                  }
                  image={calendarPlain}
                />
              </div>
              <div className="flex flex-row gap-[16px] md:gap-[20px]">
                <PrimaryCTA onClick={handleLogin}>Get started now</PrimaryCTA>
                <SecondaryCTA>Continue as guest</SecondaryCTA>
              </div>
            </div>
            <div className="flex md:flex flex-1 hidden">
              <img src={calendarPlain} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ratingStarFillState = ({
  starIndex,
  rating,
}: {
  starIndex: number
  rating: number
}) => {
  const completeIndex = Math.floor(rating)
  const partialIndex = rating - completeIndex
  const isPartial = partialIndex > 0 && starIndex === completeIndex + 1
  return isPartial
    ? 'far fa-star half-filled'
    : starIndex <= rating
    ? 'fas fa-star filled'
    : 'far fa-star'
}

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex flex-row gap-[6px] text-[24px]">
      {[1, 2, 3, 4, 5].map((i) => {
        const className = ratingStarFillState({ starIndex: i, rating })
        return <span key={i} data-rating className={className} />
      })}
    </div>
  )
}

interface TestimonialCardProps {
  rating: number
  message: string
  author: string
  image?: string
  footnote: string
}

function TestimonialCard({
  rating,
  message,
  author,
  image,
  footnote,
}: TestimonialCardProps) {
  return (
    <div className="flex flex-col gap-[20px] min-w-[70vw] md:min-w-[unset]">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-row items-center gap-[16px]">
          <Rating rating={rating} />
          <p className="font-[600] font-[Montserrat] md:font-[800] text-[28px] md:text-[36px]">
            {rating}
          </p>
        </div>
        <p className="text-[#807B87] text-[16xp] text-left">{message}</p>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-row items-center gap-[12px]">
          {image ? (
            <img src={image} className="rounded-[50%] w-[40px] h-[40px]" />
          ) : (
            <div className="flex justify-center items-center bg-[white]/[8%] rounded-[50%] w-[40px] h-[40px] text-[16px]">
              {author
                .split(' ')
                .slice(0, 2)
                .map((w) => w.trim()?.[0])
                .join('')
                .toUpperCase()}
            </div>
          )}
          <p className="text-[16px]">{author}</p>
        </div>
        <div className="bg-[white]/[5%] w-full h-[1px]" />
        <div className="flex flex-row items-center gap-[12px] w-full">
          <div className="flex bg-[white]/[5%] p-[6px] rounded-full">
            <PlayArrow />
          </div>
          <p className="line-clamp-1 text-[#807B87]">{footnote}</p>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  return (
    <div className={`${styles.sectionOuterContainer} radial-gradient`}>
      <div className={styles.sectionContainer}>
        <div
          id="reviews"
          className="relative py-[100px] w-full text-left text-white"
        >
          <div className="top-0 absolute w-full h-[1px] white-gradient"></div>
          <div className="bottom-0 absolute w-full h-[1px] white-gradient"></div>
          <div className="flex flex-col items-start gap-[40px] w-full">
            <div className="flex flex-col flex-1 gap-[40px]">
              <div className="flex flex-col gap-[20px]">
                <BlueText>Testimonials</BlueText>
                <HeadingText>People love using KonectA</HeadingText>
                <p className="text-[white]/[60%]">
                  Their opinions are valuable and worth sharing to everyone.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-[24px] pb-[16px] md:pb-[unset] w-full overflow-x-scroll scrollbar">
              <TestimonialCard
                rating={4.5}
                message={
                  'Excepteur sint occaecat cupidatat non proident,  sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur egestas purus viverra.'
                }
                author={'Sarah Simson'}
                footnote={'The advanced cryptocurrency trading view is amazing'}
              />
              <TestimonialCard
                rating={5}
                message={
                  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tempor incididunt ut labore et dolore magna aliqua reprehenderit in.'
                }
                image={testimonial2}
                author={'Shasha Howell'}
                footnote={'The advanced cryptocurrency trading view is amazing'}
              />
              <TestimonialCard
                rating={4}
                message={
                  'Varius vel pharetra vel turpis nunc eget lorem. Congue mauris rhoncus aenean vel elit scelerisque. Auctor urna nunc id cursus. Proin fermentum leo vel orci porta. Dui vivamus arcu felis bibendum ut tristique et vitae proin sagittis nisl.'
                }
                image={testimonial3}
                author={'Elaine Daniels'}
                footnote={'The advanced cryptocurrency trading view is amazing'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LightLogo() {
  return (
    <svg
      className="w-[268px] md:w-[410px] h-[189px] md:h-[289px]"
      viewBox="0 0 410 289"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M133.296 64.865C133.296 52.1577 143.597 41.8564 156.304 41.8564H207.564H258.823C271.531 41.8564 281.832 52.1577 281.832 64.865H323.688C323.688 29.041 294.647 0 258.823 0H207.564H156.304C120.48 0 91.4394 29.041 91.4394 64.865H133.296ZM10.5685 215.766C12.5345 215.766 14.3751 215.229 15.9518 214.294C26.4715 256.854 64.9115 288.409 110.721 288.409H304.407C349.694 288.409 387.778 257.57 398.806 215.747C399.013 215.76 399.221 215.766 399.431 215.766C405.268 215.766 410 211.034 410 205.197V173.492C410 167.655 405.268 162.923 399.431 162.923C398.952 162.923 398.48 162.955 398.017 163.017C386.054 122.634 348.671 93.1735 304.407 93.1735H110.721C65.8048 93.1735 27.9735 123.51 16.5989 164.811C14.8887 163.621 12.8101 162.923 10.5685 162.923C4.73168 162.923 0 167.655 0 173.492V205.197C0 211.034 4.73168 215.766 10.5685 215.766ZM90.9277 190.408C90.9277 168.228 108.908 150.248 131.088 150.248H279.047C301.227 150.248 319.207 168.228 319.207 190.408C319.207 212.588 301.227 230.569 279.047 230.569H131.088C108.908 230.569 90.9277 212.588 90.9277 190.408Z"
        fill="white"
        fillOpacity="0.05"
      />
    </svg>
  )
}

function FooterHero({ handleLogin }: CommonProps) {
  return (
    <div className={styles.sectionOuterContainer}>
      <div className={styles.sectionContainer}>
        <div className="relative flex flex-col justify-center items-center py-[100px] md:py-[200px]">
          <div className="relative flex flex-col justify-center items-center gap-[40px] text-white">
            <LightLogo />
            <div className="flex flex-col justify-center items-center gap-[20px] text-white">
              <p className="font-[600] font-[Montserrat] md:font-[800] text-[32px] md:text-[48px]">
                Get started now!
              </p>
              <p className="text-[16px] text-[white]/[50%]">
                Ready to see what KonectA can do for you? Begin your journey!
              </p>
            </div>
            <div className="flex flex-row gap-[16px] md:gap-[20px]">
              <PrimaryCTA onClick={handleLogin}>Get started now</PrimaryCTA>
              <SecondaryCTA>Continue as guest</SecondaryCTA>
            </div>
            <div className="top-0 left-0 absolute w-full h-full footerHeroBg" />
          </div>
          <img
            src={footeruser1}
            className="top-[10%] md:top-[20%] left-[0%] md:left-[15%] absolute rounded-full w-[78px] md:w-[146px] h-[78px] md:h-[146px]"
          />
          <img
            src={footeruser2}
            className="top-[90%] md:top-[60%] left-[10%] absolute rounded-full w-[76px] md:w-[107px] h-[76px] md:h-[107px]"
          />
          <img
            src={footeruser3}
            className="top-[35%] md:top-[23%] right-[0%] md:right-[5%] absolute rounded-full w-[68px] md:w-[128px] h-[68px] md:h-[128px]"
          />
          <img
            src={footeruser4}
            className="top-[95%] md:top-[70%] right-[5%] md:right-[15%] absolute rounded-full w-[82px] md:w-[155px] h-[82px] md:h-[155px]"
          />
        </div>
      </div>
    </div>
  )
}

function FaqSection() {
  const [openItemIndex, setOpenItemIndex] = React.useState(0)
  return (
    <div className={styles.sectionOuterContainer}>
      <div className={styles.sectionContainer}>
        <div
          id="faq"
          className="flex md:flex-row flex-col justify-start items-start gap-[40px] md:gap-[130px] py-[100px] text-left text-white"
        >
          <div className="flex flex-col flex-1 gap-[12px]">
            <h2 className="font-[600] font-[Montserrat] md:font-[700] text-[32px] md:text-[48px]">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
            <p className="text-[16px] text-[white]/[60%]">
              We know you have some question in mind, we’re tried to list the
              most important one.
            </p>
          </div>
          <div className="flex flex-col flex-1 w-full">
            {_.map(
              [
                {
                  question: 'How does KonectA work?',
                  answer:
                    'On Konecta, the user can decide which live event to attend based on their availability with a simple glance, however on YouTube or Instagram, you have to adapt to the live event, and it is difficult to know when your favorite creators are going to go live, as your subscriptions increase over time.',
                },
                {
                  question: 'Different from other social networks',
                  answer:
                    'On Konecta, the user can decide which live event to attend based on their availability with a simple glance, however on YouTube or Instagram, you have to adapt to the live event, and it is difficult to know when your favorite creators are going to go live, as your subscriptions increase over time.',
                },
                {
                  question: 'Is KonectA free to use?',
                  answer:
                    'On Konecta, the user can decide which live event to attend based on their availability with a simple glance, however on YouTube or Instagram, you have to adapt to the live event, and it is difficult to know when your favorite creators are going to go live, as your subscriptions increase over time.',
                },
                {
                  question: 'Payment methods',
                  answer:
                    'On Konecta, the user can decide which live event to attend based on their availability with a simple glance, however on YouTube or Instagram, you have to adapt to the live event, and it is difficult to know when your favorite creators are going to go live, as your subscriptions increase over time.',
                },
                {
                  question: 'Help and support',
                  answer:
                    'On Konecta, the user can decide which live event to attend based on their availability with a simple glance, however on YouTube or Instagram, you have to adapt to the live event, and it is difficult to know when your favorite creators are going to go live, as your subscriptions increase over time.',
                },
                {
                  question: 'Data and statistics',
                  answer:
                    'On Konecta, the user can decide which live event to attend based on their availability with a simple glance, however on YouTube or Instagram, you have to adapt to the live event, and it is difficult to know when your favorite creators are going to go live, as your subscriptions increase over time.',
                },
              ],
              (data, index) => {
                return (
                  <FAQItem
                    key={index}
                    data={data}
                    index={index}
                    openItemIndex={openItemIndex}
                    setOpenItemIndex={setOpenItemIndex}
                  />
                )
              },
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function NewsletterSection() {
  return (
    <div className={styles.sectionOuterContainer}>
      <div className={styles.sectionContainer}>
        <div className="flex flex-col py-[32px] md:py-[100px] text-white">
          <div
            className="flex flex-col justify-center items-center gap-[20px] border-[1px] border-[white]/[10%] py-[68px] md:py-[150px] rounded-[16px] w-full"
            style={{ background: `url(${emailbg})` }}
          >
            <h2 className="font-[600] font-[Montserrat] text-[32px] md:text-[48px]">
              Get monthly goodies
            </h2>
            <p className="px-[48px] text-[16px] text-[white]/[50%] md:text-[18px]">
              Get the latest release and news about KonectA
            </p>

            <div className="relative flex md:flex-row flex-col gap-[24px] md:gap-[0px] px-[24px] md:px-[unset] w-[100%] md:w-[40%] md:min-w-[unset]">
              <input
                className="flex flex-1 border-[1px] border-[white]/[4%] bg-[white]/[6%] px-[14px] py-[12px] md:py-[16px] md:pr-[160px] rounded-[8px] w-full h-[56px] text-[16px]"
                placeholder="Email"
              />
              <button className="md:right-0 md:z-10 md:absolute bg-[white]/[6%] px-[40px] rounded-[8px] h-[48px] md:h-[56px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Footer({ handleLogin }: CommonProps) {
  return (
    <div className={`${styles.sectionOuterContainer} radial-gradient`}>
      <div className={styles.sectionContainer}>
        <div className="relative py-[80px] w-full text-left text-white">
          <div className="top-0 absolute w-full h-[1px] white-gradient"></div>
          <div className="flex md:flex-row flex-col justify-between items-center gap-[48px]">
            <div className="flex flex-col justify-start items-start gap-[20px]">
              <div className="flex flex-col justify-start items-start gap-[12px]">
                <BlueText>Getting started</BlueText>
                <h2 className="font-[600] font-[Montserrat] text-[32px] md:text-[48px]">
                  Start your KonectA journey
                </h2>
              </div>
              <p className="text-[16px] text-[white]/[60%]">
                Learn everything you need to know, from beginner to master.
              </p>
            </div>
            <div>
              <div className="flex flex-row gap-[16px] md:gap-[20px]">
                <PrimaryCTA onClick={handleLogin}>Get started now</PrimaryCTA>
                <SecondaryCTA>Continue as guest</SecondaryCTA>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SiteFooter() {
  return (
    <div className={styles.sectionOuterContainer}>
      <div className={styles.sectionContainer}>
        <div className="relative pt-[32px] md:pt-[60px] pb-[32px] w-full text-[14px] text-left text-white">
          <div className="top-0 absolute w-full h-[1px] white-gradient"></div>
          <div className="flex md:flex-row flex-col justify-between items-center gap-[36px]">
            <div className="order-3 md:order-1 text-[white]/[60%]">
              ©2023 KonectA
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-[24px] md:gap-[0px] order-1 md:order-2 w-full md:w-[unset]">
              <a href="#features" className="md:px-[20px] text-[white]/[60%]">
                Features
              </a>
              <a href="#howitworks" className="md:px-[20px] text-[white]/[60%]">
                How it works
              </a>
              <a href="#reviews" className="md:px-[20px] text-[white]/[60%]">
                Reviews
              </a>
              <a href="#faq" className="md:px-[20px] text-[white]/[60%]">
                FAQ
              </a>
              <a href="#" className="md:px-[20px] text-[white]/[60%]">
                Privacy policy
              </a>
              <a href="#" className="md:px-[20px] text-[white]/[60%]">
                Terms and conditions
              </a>
            </div>
            <div className="flex flex-row gap-[20px] order-2 md:order-3 text-[20px]">
              <a href="#">
                <i className="fa-instagram fab social-button" />
              </a>
              <a href="#">
                <i className="fa-facebook fab social-button" />
              </a>
              <a href="#">
                <i className="fa-youtube fab social-button" />
              </a>
              <a href="#">
                <i className="fa-twitter fab social-button" />
              </a>
              <a href="#">
                <i className="fa-discord fab social-button" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Landing({
  setTargets,
}: {
  setTargets: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [welcomeForm, setWelcomeForm] = React.useState(false)
  const [verifyForm, setVerifyForm] = React.useState(false)
  // const [paymentSuccess, setPaymentSuccess] = React.useState(false)
  const [signUpForm, setSignUpForm] = React.useState(false)
  const [openLoginInfoModal, setOpenLoginInfoModal] = React.useState(false)

  const { identity, user, agent, disconnect } = useIdentityKit()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [shouldInvokeLogin, setShouldInvokeLogin] = React.useState(false)

  // a hook to ensure login is called only once
  const [invokedLogin, setInvokedLogin] = React.useState(false)

  React.useEffect(() => {
    const login = async () => {
      if (
        identity !== undefined &&
        user?.principal &&
        user.principal.toText() !== '2vxsx-fae'
      ) {
        try {
          dispatch(setLoader(true))

          const agent = HttpAgent.createSync({
            identity,
            host: 'https://icp0.io',
          })

          const attemptResponse = await indexActorServiceInstance.initV2(
            agent,
            identity,
          )

          const localStorageUserCanisterId =
            localStorage.getItem('userCanisterId')

          const didUserCanisterIdMatched =
            attemptResponse?.userCanisterId === localStorageUserCanisterId

          if (!didUserCanisterIdMatched && attemptResponse?.userCanisterId) {
            localStorage.setItem(
              'userCanisterId',
              attemptResponse.userCanisterId,
            )

            setTargets((targets: string[]) => {
              if (attemptResponse.userCanisterId) {
                return [...targets, attemptResponse.userCanisterId]
              } else {
                return targets
              }
            })

            disconnect()
            navigate('/landing')

            setShouldInvokeLogin(false)
            setInvokedLogin(false)

            setOpenLoginInfoModal(true)
            return
          }

          if (attemptResponse === undefined) {
            dispatch(setLoader(false))
            return
          }

          const { type, success } = attemptResponse

          if (type === 'signup_required') {
            // if (true) {
            dispatch(setLoader(false))
            // handleSignUpFormOpen()
            handleWelcomeFormOpen()
          } else if (type === 'login') {
            if (success) {
              const allPromise = []
              allPromise.push(indexActorServiceInstance.eventActorInit())
              allPromise.push(indexActorServiceInstance.konectaActorInit())
              await Promise.all(allPromise)

              const currentUrl = window.location.href
              const url = new URL(currentUrl)
              const redirectTo = url.searchParams.get('redirectTo')

              if (redirectTo) {
                navigate(redirectTo)
              } else {
                navigate('/calendar')
              }
            }

            dispatch(setLoader(false))
          }

          dispatch(setLoader(false))
        } catch (error) {
          console.log(error)
          dispatch(setLoader(false))
        } finally {
          dispatch(setLoader(false))
        }

        setShouldInvokeLogin(false)
        setInvokedLogin(false)
      }
    }

    if (shouldInvokeLogin) {
      if (!invokedLogin) {
        setInvokedLogin(true)
        login()
      }
    }
  }, [
    agent,
    identity,
    user,
    setShouldInvokeLogin,
    invokedLogin,
    setInvokedLogin,
  ])

  const handleOpen = () => {
    setLoginOpen(true)
  }

  const handleLoginClose = () => {
    setLoginOpen(false)
  }

  const handleWelcomeFormOpen = () => {
    setWelcomeForm(true)
  }

  const handleWelcomeFormClose = () => {
    setWelcomeForm(false)
  }

  const handleVerifyFormOpen = () => {
    setVerifyForm(true)
  }

  const handleVerifyFormClose = () => {
    setVerifyForm(false)
  }

  // const handlePaymentSuccessOpen = () => {
  //   setPaymentSuccess(true)
  // }

  // const handlePaymentSuccessClose = () => {
  //   setPaymentSuccess(false)
  // }

  const handleSignUpFormOpen = () => {
    setSignUpForm(true)
  }
  const handleSignUPFormClose = () => {
    setSignUpForm(false)
  }

  const connectWalletRef = React.useRef<HTMLDivElement>(null)

  const handleConnect = () => {
    if (connectWalletRef.current) {
      const button = connectWalletRef.current.querySelector('button')
      if (button) {
        button.click()
      }
    }
    setShouldInvokeLogin(true)
  }

  const handleLoginInfoClose = () => {
    setOpenLoginInfoModal(false)
  }

  return (
    <div className={`${styles.page} scrollbar`}>
      <Header handleLogin={handleConnect} handleSignUp={handleOpen} />
      <Hero handleLogin={handleConnect} />
      <Calendar />
      <LiveEvents handleLogin={handleOpen} />
      <CategoryTopics />
      <AboutSection handleLogin={handleOpen} />
      <FeaturesSection handleLogin={handleOpen} />
      <HowItWorks handleLogin={handleOpen} />
      <Testimonials />
      <FooterHero handleLogin={handleOpen} />
      <FaqSection />
      <NewsletterSection />
      <Footer handleLogin={handleOpen} />
      <SiteFooter />
      {/* <LogIn
        isOpen={loginOpen}
        handleClose={handleLoginClose}
        handleSignUpFormOpen={handleSignUpFormOpen}
      /> */}
      <Welcome2
        isOpen={welcomeForm}
        handleVerifyFormOpen={handleVerifyFormOpen}
        handleClose={handleWelcomeFormClose}
      />
      <VerifyPayment
        isOpen={verifyForm}
        handleClose={handleVerifyFormClose}
        icpAddress={indexActorServiceInstance.userSubaccLedgerIdentifier}
        handleSignUpFormOpen={handleSignUpFormOpen}
        paymentValue={'0.01'}
        setLoader={setLoader}
      />
      {/* <SuccessPayment
        isOpen={paymentSuccess}
        handleClose={handlePaymentSuccessClose}
      /> */}
      <SignUp
        isOpen={signUpForm}
        handleClose={handleSignUPFormClose}
        setTargets={setTargets}
      />
      <div ref={connectWalletRef} style={{ visibility: 'hidden' }}>
        <ConnectWallet />
      </div>
      <LoginInfo
        isOpen={openLoginInfoModal}
        handleClose={handleLoginInfoClose}
      />
    </div>
  )
}

export default Landing
