import styles from '../styles/home.module.css';
import { connect } from 'react-redux';
import { Products } from '../components';
import { handleGetProducts,sortProducts } from '../actions';
function Home(props){
    const {sortProducs,dispatch,products}=props;
    const handleSortProducts=()=>{
        dispatch(sortProducts(products));
    }
    const handleUnSortProducts=()=>{
      dispatch(handleGetProducts());
    }
    return (
        <div  style={{border:"2px solid red",height:"90vh"}}>
            {sortProducs?<button onClick={handleUnSortProducts}>Sort by price  X </button>:<button onClick={handleSortProducts}>Sort by price</button>}
            
            <Products/>
        </div>
    )
}
function mapStateToProps(state)
{ 
  return {
    sortProducs:state.sortProducts,
    products:state.products
  }
}

const ConnectedHomeComponent=connect(mapStateToProps)(Home);
export default ConnectedHomeComponent