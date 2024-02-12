import { Spinner, Button } from "flowbite-react"

const CustomSpinner = () => {
    return ( 
        <Button color='gray'>
        <Spinner  aria-label="Spinner button example" size="sm" />
        <span className="pl-3">Loading...</span>
      </Button>
     );
}
 
export default CustomSpinner;