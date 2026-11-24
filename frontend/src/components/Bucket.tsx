import { useDroppable } from "@dnd-kit/react";

const Bucket = ({id, children}) => {
    const {ref} = useDroppable({
        id,
    });

  return (
    <div ref={ref} className="w-full min-h-4/5 border border-gray-500" >
        {children}
    </div>
  )
}

export default Bucket