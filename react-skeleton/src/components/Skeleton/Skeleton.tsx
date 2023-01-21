import './Skeleton.css';

type SkeletonProps = {
  classes: string;
}

const Skeleton = ({ classes }: SkeletonProps) => {
  const classNames = `skeleton ${classes} animate-pulse`;

  return (
    <div className={classNames}></div>
  )
}

export default Skeleton