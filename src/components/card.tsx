import { Sag } from '@prisma/client'

interface iCardProps {
  sag: Sag
}

const Card: React.FC<iCardProps> = ({ sag }) => {
  return (
    <div className="w-full rounded bg-neutral-800 p-4 flex flex-col gap-4">
      <span className="bg-red-800 text-neutral-50 px-2 py-[1px] max-w-fit rounded-full font-bold">
        {sag.number}
      </span>
      <h3>{sag.title}</h3>
    </div>
  )
}

export default Card
