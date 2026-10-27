import { Text as RNText, type TextProps } from "react-native";

export function Text({ className, ...rest }: TextProps) {
  return <RNText className={"font-normal " + (className ?? "")} {...rest} />;
}

export type { TextProps };
