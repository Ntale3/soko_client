import { CategoryBadgeGroup } from "../ui/badge"
import { Button } from "../ui/button"

const items=[
    { label: "All" },
    { label: "Grains",      image: "🌾" },
    { label: "Vegetables",  image: "🥦" },
    { label: "Fruits",      image: "🍎" },
    { label: "Dairy",       image: "🥛" },
    { label: "Herbs",       image: "🌿" },
  ]

const Categories = () => {

  return (
    <div>
      {/* Category header */}
      <div className="flex items-center justify-between">
        <h3 className="text-foreground font-semibold ">Categories</h3>

        <Button variant={"link"}>
          See all
        </Button>
      </div>

      {/* Category Badges */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 my-3">
        <CategoryBadgeGroup
          defaultValue="All"
          onChange={(val) => console.log(val)}
          items={[
            { label: "All" },
            { label: "Grains",      image: "🌾" },
            { label: "Vegetables",  image: "🥦" },
            { label: "Fruits",      image: "🍎" },
            { label: "Dairy",       image: "🥛" },
          ]}
        />
      </div>

    </div>
  )
}

export default Categories