interface Props {
  size: number;
}

export default function SkeletonWhoToFollow({ size }: Props) {
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="h-4 w-24 rounded-md bg-muted"></div>{" "}
      {[...Array(size)].map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center space-x-3 opacity-80"
        >
          <div className="h-10 w-10 rounded-full bg-muted"></div>{" "}
          <div className="h-4 w-36 rounded-md bg-muted"></div>{" "}
        </div>
      ))}
    </div>
  );
}

export function SkeletonPost({ size }: Props) {
  return (
    <>
      {[...Array(size)].map((_, index) => (
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
          <div
            key={index}
            className="flex animate-pulse flex-col space-y-3 opacity-80"
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="h-4 w-36 rounded-md bg-muted"></div>
            </div>
            <div className="h-6 w-full rounded-md bg-muted"></div>
          </div>
        </div>
      ))}
    </>
  );
}
