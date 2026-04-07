const handleIncrement=()=>{
    setCount(count+1)
    console.log(count)
}
return (
    <div>
        <h1>Count: {count}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus quidem quae ut velit, atque delectus unde amet expedita incidunt ab eius reiciendis. Explicabo, nulla similique. Aperiam quod quam culpa enim!</p>
        <button onClick={handleIncrement}>Increment</button>
    </div>
)