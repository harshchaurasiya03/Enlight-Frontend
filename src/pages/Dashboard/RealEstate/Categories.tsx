import PageMeta from "../../../components/dashboard/common/PageMeta";
import Categories from "../../../components/dashboard/RealEstate/Categories";

export default function CategoriesPage (){
    return(
        <div>
            <PageMeta
            title="Categories Dashboard"
            description="Categories of all propety like 2BHK, Villa"
            />
            <Categories/>
        </div>
    )
}