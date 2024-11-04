
interface ContainerProps{
    children: React.ReactNode;
}

 const Container: React.FC<ContainerProps> = ({
    children
}) => {
  return (
    <div className="mx-auto m-w-7xl mt-24 px-4">{children}</div>
  )
}

export default Container
