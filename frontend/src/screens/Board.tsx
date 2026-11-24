import {useDraggable} from '@dnd-kit/react';
import {DragDropProvider} from '@dnd-kit/react';
import IssueCard from "@/components/IssueCard"
import { useState } from 'react';
import Bucket from '@/components/Bucket';

const Board = () => {
  const targets = ['UpNext', 'InProgress', 'Done'];
  const [target, setTarget] = useState<string>();

  return (
    <DragDropProvider>
      <div className='flex min-h-lvh'>
        <div className='w-1/3 border-r-4'>
          <h1>UpNext</h1>
          <Bucket id="upnext">
            <IssueCard content="IssueCard number 1" />
          </Bucket>
        </div>
        <div className='w-1/3 border-r-4'>
          <h1>InProgress</h1>
          <Bucket id="inprogress">
            <IssueCard content="IssueCard number 2" />
            <IssueCard content="IssueCard number 3" />
            <IssueCard content="IssueCard number 4" />
          </Bucket>
        </div>
        <div className='w-1/3'>
          <h1>Done</h1>
          <Bucket id="done">
            <IssueCard content="IssueCard number 5" />
            <IssueCard content="IssueCard number 6" />
          </Bucket>
        </div>
      </div>
    </DragDropProvider>
  )
  }
  
  export default Board