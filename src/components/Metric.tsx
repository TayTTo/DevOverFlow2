import { Link } from '@tanstack/react-router'

interface Props {
  imgUrl: string
  alt: string
  value: string | number
  title: string
  textStyles: string
  imgStyles?: string
  isAuthor?: boolean
  // Next.js took any `href`; typed TanStack links need a known route,
  // and the only linked metric is the author's profile.
  profileId?: string
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  imgStyles = '',
  isAuthor = false,
  profileId,
}: Props) => {
  const metricContent = (
    <>
      <img
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`rounded-full object-contain ${imgStyles}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}
        >
          {title}
        </span>
      </p>
    </>
  )

  return profileId ? (
    <Link
      to="/profile/$id"
      params={{ id: profileId }}
      className="flex-center gap-1"
    >
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  )
}

export default Metric
