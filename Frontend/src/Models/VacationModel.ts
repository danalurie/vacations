import { RegisterOptions } from "react-hook-form";


class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public image: File;

    public static destinationValidation: RegisterOptions = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 2, message: "Destination must be minimum 2 chars" },
        maxLength: { value: 50, message: "Destination can't exceeds 50 chars" }
    };
    
    public static descriptionValidation: RegisterOptions = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 2, message: "Description must be minimum 2 chars" },
        maxLength: { value: 1000, message: "Description can't exceeds 50 chars" }
    };
    
    public static startDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing start date" },
    };
    
    public static endDateValidation: RegisterOptions = {
        required: { value: true, message: "Missing end date" },
    };

    public static priceValidation: RegisterOptions = {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "Price can't be negative" },
    };

    public static imageValidation: RegisterOptions = {
        required: { value: true, message: "Missing image" }
    };


}

export default VacationModel