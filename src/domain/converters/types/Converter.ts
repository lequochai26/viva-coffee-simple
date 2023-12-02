import BeforeConverting from "./BeforeConverting";
import ConvertedSuccessful from "./ConvertedSuccessful";

type Converter<F, T> = (before: BeforeConverting<T>, from: F, success: ConvertedSuccessful<T>, error: ErrorOccurred) => T;
export default Converter;