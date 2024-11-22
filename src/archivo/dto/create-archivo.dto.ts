import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ToUpperCase } from "src/competencia/decoradores/toUpperCaseDecorator";

export class CreateArchivoDto {
    @IsString()
    @IsNotEmpty()
    @ToUpperCase()
    name : string;

    @IsNumber()
    @IsNotEmpty()  
    tamano : number;

    @IsString()
    @IsNotEmpty()
    url : string;

    @IsString()
    @IsNotEmpty()
    publicid : string;


}
