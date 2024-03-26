import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// State : 앱이 기억해야 하는 최소한의 변화하는 데이터 집합
/*
  State를 사용하려면?
  - 시간이 지나도 변하지 않나요? 그렇다면 state가 아닙니다. 
  - 부모로부터 props를 통해 전달되나요? 그렇다면 state가 아닙니다.
  - 컴포넌트의 기존 state 또는 props를 가지고 계산할 수 있나요? 그렇다면 당연히 state가 아닙니다!  


  이 앱에서 State로 사용할 부분은 어딜까?
  1. 제품의 원본 목록
  2. 사용자가 입력한 검색어
  3. 체크박스의 값
  4. 필터링된 제품 목록

  1. 제품 원본 목록은 props로 전달되었으므로 state가 아니다.
  2. 검색어는 시간에 따라 바뀌고 다른 것으로부터 계산할 수 없으므로 state로 볼 수 있다.
  3. 체크박스의 값은 시간에 따라 바뀌고 다른 것으로부터 계산할 수 없으므로 state로 볼 수 있다.
  4. 필터링된 제품 목록은 원본 목록으로부터 검색어 및 체크박스 값을 조합하여 계산할 수 있으므로 state가 아니다.

  즉, 검색어와 체크박스 값만 state!
*/

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." />
      <label>
        <input type="checkbox" checked={inStockOnly}/> {' '}Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const[filterText, setFilterText] = useState('fruit');
  const[inStockOnly, SetInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly}/>
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}/>
    </div>
  );
}

const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
