import { useDraggable } from "@dnd-kit/react";

const IssueCard = ({content}) => {
    const {ref} = useDraggable({
        id: 'draggable',
    });
  return (
    <div ref={ref} className="cursor-pointer">
        <p className="border border-gray-800 m-4 p-2">{content}</p>
    </div>
  )
}

export default IssueCard