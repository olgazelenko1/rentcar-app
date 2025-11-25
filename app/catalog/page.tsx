export default function CatalogPage() {
  return (
    <div>
      {/* Панель фільтрів */}
      <div>
        <select>
          <option>Car brand</option>
        </select>
        <select>
          <option>Price per hour</option>
        </select>
        <input type="number" placeholder="Mileage from" />
        <input type="number" placeholder="Mileage to" />
        <button>Search</button>
      </div>

      {/* Список автомобілів */}
      <div>
        <p>Car list will be here</p>
      </div>

      {/* Кнопка Load More */}
      <button>Load More</button>
    </div>
  );
}
