import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css'

const Home = () => {
    //holds category data
    const [categoryList , setCategoryList] = useState([]);

    useEffect(()=>{
     getCatogoryData();
    },[])
    
    /**
     * getCatogoryData methos returns the Category List
     */
    const getCatogoryData = async() => {
     const category = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
     const data =  await category.json();
     setCategoryList(data.categories);
    }

    if(categoryList?.length < 0)
        return null;
    return(
        <div>
            <div className="card-container">
                {
                    categoryList?.map((item) => {
                        return(
                            <Link to={"/menus/" + item.strCategory} key={item.idCategory}>
                            <div className="card">
                                <img alt={item.strCategory} src={item.strCategoryThumb}></img>
                                <div className='category-title'>{item.strCategory}</div>
                                <div className='category-description'>{item.strCategoryDescription}</div>
                            </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Home;