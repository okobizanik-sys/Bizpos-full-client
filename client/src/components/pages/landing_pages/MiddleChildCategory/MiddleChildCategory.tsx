import { TChildCategory } from "@/types";
import ChildCategoryCard from "../ChildCategory/ChildCategoryCard/ChildCategoryCard";

interface Props {
  childCategoriesList: TChildCategory[];
}

const MiddleChildCategory: React.FC<Props> = ({ childCategoriesList }) => {
  return (
    <div className="Container py-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2  gap-3">
        {childCategoriesList?.map((childCategory: TChildCategory) => (
            <ChildCategoryCard
              key={childCategory._id}
              childCategory={childCategory}
            />
          ))}
      </div>
    </div>
  );
};

export default MiddleChildCategory;
