import styled from "styled-components"

const NumberInput = styled.input`
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
    }
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    -moz-appearance:textfield
`
const handleOnNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    ((e.target as HTMLInputElement)?.nextElementSibling as HTMLElement)?.focus()
}


const CodeInput = () => {
    return (
        <form>
            <NumberInput type="number" min="0" max="9" maxLength={1} placeholder=" " onInput={handleOnNumberInput} id="n1" autoFocus/>
            <NumberInput type="number" min="0" max="9" maxLength={1} placeholder=" " onInput={handleOnNumberInput} id="n2"/>
            <NumberInput type="number" min="0" max="9" maxLength={1} placeholder=" " onInput={handleOnNumberInput} id="n3"/>
            <NumberInput type="number" min="0" max="9" maxLength={1} placeholder=" " id="n4"/>
            {/* <label class="submit" type="button" tabindex="0" for="submitted" onkeypress="document.getElementById('submitted').checked='true'"></label> */}
            {/* <span class="indicator"></span> */}
        </form>
    )
}

export default CodeInput