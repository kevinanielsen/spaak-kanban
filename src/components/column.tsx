import { Sag } from '@prisma/client'
import Card from './card'

interface iColumnProps {
  statusId: number
  cases: Sag[]
}

const Column: React.FC<iColumnProps> = ({ statusId, cases }) => {
  return (
    <div className="flex flex-col max-h-[81.8vh] overflow-y-scroll min-w-80 gap-4 p-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold">Status id: {statusId}</h2>
        <span className="bg-neutral-950/20 text-neutral-300 px-2 rounded-full">{cases.length}</span>
      </div>
      {cases.map((sag) => (
        <Card sag={sag} key={sag.id} />
      ))}
    </div>
  )
}
export default Column
