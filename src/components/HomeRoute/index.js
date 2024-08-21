import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {LuShoppingCart} from 'react-icons/lu'
import {FiHome} from 'react-icons/fi'
import {TbLogout2} from 'react-icons/tb'
import Header from '../Header'
import Queries from '../Queries'
import CartContext from '../../context/CartContext'
import './index.css'

const mobileCategoryOptions = [
  {
    imageUrl:
      'https://res.cloudinary.com/dayzpflw1/image/upload/v1721799429/Group_7419_yxbjlk.svg',
    name: 'All',
    categoryId: '1',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/dayzpflw1/image/upload/v1721799403/Group_7418_puakaz.svg',
    name: 'Fruits & Vegetables',
    categoryId: '2',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/dayzpflw1/image/upload/v1721799377/Vector_jerdug.svg',
    name: 'Cold Drinks & Juices',
    categoryId: '3',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/dayzpflw1/image/upload/v1721799354/Vector_1_zedf7y.svg',
    name: 'Beverages',
    categoryId: '4',
  },
  {
    imageUrl:
      'https://res.cloudinary.com/dayzpflw1/image/upload/v1721799315/Vector_2_ttckon.svg',
    name: 'Foodgrains, Oil & Masala',
    categoryId: '5',
  },
  {
    name: 'Bakery, Cakes & Dairy',
    categoryId: '6',
  },
  {
    name: 'Snacks & Branded Foods',
    categoryId: '7',
  },
  {
    name: 'Eggs, Meat & Fish',
    categoryId: '8',
  },
  {
    name: 'Gourmet & World Food',
    categoryId: '9',
  },
  {
    name: 'Baby Care',
    categoryId: '10',
  },
  {
    name: 'Cleaning & Household',
    categoryId: '11',
  },
  {
    name: 'Beauty & Hygiene',
    categoryId: '12',
  },
  {
    name: 'Kitchen, Garden & Pets',
    categoryId: '13',
  },
  {
    name: 'Chocolates & Candies',
    categoryId: '14',
  },
  {
    name: 'Dry Fruits',
    categoryId: '15',
  },
  {
    name: 'Indian Mithai',
    categoryId: '16',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const navigationIcons = [
  {
    icon: <FiHome />,
    id: 1,
  },
  {
    icon: <LuShoppingCart />,
    id: 2,
  },
]

class HomeRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeCategoryId: '1', // Default to 'All' category
    activeItem: 1,
    allCategories: [],
    filteredCategories: [],
  }

  componentDidMount() {
    this.getApiCall()
  }

  getApiCall = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.categories.map(eachCategory => ({
        name: eachCategory.name,
        products: eachCategory.products,
      }))
      this.setState({
        allCategories: updatedData,
        filteredCategories: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  activeCategory = (activeId, categoryName) => {
    const {allCategories} = this.state
    const filteredCategories =
      categoryName === 'All'
        ? allCategories
        : allCategories.filter(category => category.name === categoryName)

    // Rearrange the categories
    const remainingCategories = allCategories.filter(
      category => category.name !== categoryName,
    )
    const rearrangedCategories =
      categoryName === 'All'
        ? allCategories
        : [filteredCategories[0], ...remainingCategories]

    this.setState({
      activeCategoryId: activeId,
      filteredCategories: rearrangedCategories,
    })
  }

  onClickBtn = id => {
    const {history} = this.props
    this.setState({activeItem: id})
    if (id === 2) {
      history.push('/cart')
    }
  }

  logoutBtn = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderProductsListView = () => {
    const {activeCategoryId, filteredCategories} = this.state

    return (
      <>
        <ul className="mobile-categories-container">
          {mobileCategoryOptions.map(eachCategory => (
            <li className="mobile-category-item" key={eachCategory.categoryId}>
              <button
                type="button"
                className={
                  activeCategoryId === eachCategory.categoryId
                    ? 'active-category'
                    : 'normal-category'
                }
                onClick={() =>
                  this.activeCategory(
                    eachCategory.categoryId,
                    eachCategory.name,
                  )
                }
              >
                {eachCategory.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="desktop-container">
          <ul className="desktop-categories-container">
            <h1 className="categories-heading">Categories</h1>
            {mobileCategoryOptions.map(eachCategory => (
              <li
                className="desktop-category-item"
                key={eachCategory.categoryId}
              >
                <button
                  type="button"
                  className={
                    activeCategoryId === eachCategory.categoryId
                      ? 'desktop-active-category'
                      : 'desktop-normal-category'
                  }
                  onClick={() =>
                    this.activeCategory(
                      eachCategory.categoryId,
                      eachCategory.name,
                    )
                  }
                >
                  {eachCategory.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="categories-container">
            {filteredCategories.map(eachCategory => (
              <div className="product-container" key={eachCategory.name}>
                <h1 className="products-title">{eachCategory.name}></h1>
                <ul className="products-list">
                  <CartContext.Consumer>
                    {({
                      cartList,
                      addCartItem,
                      incrementCartItemQuantity,
                      decrementCartItemQuantity,
                    }) => (
                      <>
                        {eachCategory.products.map(product => {
                          const cartItem = cartList.find(
                            item => item.id === product.id,
                          )
                          const quantity = cartItem ? cartItem.quantity : 0

                          return (
                            <li
                              data-testid="product"
                              className="product"
                              key={product.id}
                            >
                              <img
                                className="product-image"
                                src={`${product.image}`}
                                alt="product"
                              />
                              <div>
                                <p className="product-name">{product.name}</p>
                                <p className="product-weight">
                                  {product.weight}
                                </p>
                                <div className="add-btn-container">
                                  <p className="product-price">
                                    {product.price}
                                  </p>
                                  {quantity > 0 ? (
                                    <div className="quantity-controls">
                                      <button
                                        data-testid="decrement-count"
                                        className="quantity-btn"
                                        type="button"
                                        onClick={() =>
                                          decrementCartItemQuantity(product.id)
                                        }
                                      >
                                        -
                                      </button>
                                      <p
                                        data-testid="active-count"
                                        className="quantity"
                                      >
                                        {quantity}
                                      </p>
                                      <button
                                        data-testid="increment-count"
                                        type="button"
                                        className="quantity-btn"
                                        onClick={() =>
                                          incrementCartItemQuantity(product.id)
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      className="add-btn"
                                      onClick={() => addCartItem(product)}
                                    >
                                      Add
                                    </button>
                                  )}
                                </div>
                              </div>
                            </li>
                          )
                        })}
                      </>
                    )}
                  </CartContext.Consumer>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#088c03" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dayzpflw1/image/upload/v1722317399/Group_7519_vypd75.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="opps-description">Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>

      <button className="retry-btn" type="button" onClick={this.getApiCall}>
        Retry
      </button>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {activeItem} = this.state
    return (
      <>
        <div className="home-container">
          <Header />
          {this.renderView()}
          <ul className="icons-container">
            {navigationIcons.map(eachIcon => (
              <li className="icon" key={eachIcon.id}>
                <button
                  onClick={() => this.onClickBtn(eachIcon.id)}
                  className={
                    activeItem === eachIcon.id ? 'activeIcon' : 'iconBtn'
                  }
                  type="button"
                >
                  {eachIcon.icon}
                </button>
              </li>
            ))}
            <li className="icon">
              <button
                type="button"
                className="iconBtn"
                onClick={this.logoutBtn}
              >
                <TbLogout2 />
                <p className="hide">.</p>
              </button>
            </li>
          </ul>
          <Queries />
        </div>
      </>
    )
  }
}

export default HomeRoute