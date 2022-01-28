import ReactDOM from "react-dom";

const ele = document.getElementById("root");
ReactDOM.render(<div>
    <button onClick={(e) => {
        console.log("123456")
    }}>xxxx</button>
</div>, ele);