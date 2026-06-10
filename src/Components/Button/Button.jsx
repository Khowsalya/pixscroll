// function Button({buttonType,onClick,buttonText,disabled}){
//     function handleClick(){
//         onClick && onClick()
//     }
//     return(
//         <button disabled={disabled} type={buttonType} onClick={handleClick}
//         className={`px-4 py-2 rounded 
//         ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}
//       `}>
//         {buttonText}
//         </button>
//     )
// }

// export default Button;

// orchestration component:
// Components/Button/Button.jsx
import { handleButtonClick } from "./function";
import { getButtonClass }    from "./style";

function Button({ buttonType, onClick, buttonText, disabled }) {
  return (
    <button
      disabled={disabled}
      type={buttonType}
      onClick={() => handleButtonClick(onClick)}
      className={getButtonClass(disabled)}
    >
      {buttonText}
    </button>
  );
}

export default Button;