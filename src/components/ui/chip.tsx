
import { cn } from "@/lib/utils"

export function InfoChip({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-gray-800 text-gray-200 text-xs font-medium px-3 py-1 border border-gray-700"
      )}
    >
      <Icon className="w-3.5 h-3.5 text-gray-400" />
      <span>{text}</span>
    </div>
  )
}
