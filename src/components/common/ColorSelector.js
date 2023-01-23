import { useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { useDispatch } from "react-redux";
import { setSelectedColor } from "../redux/reducers/commonReducers";

function ColorSelector({ formData, obj }) {
  const [color, setColor] = useColor(
    "hex",
    `${formData ? formData[obj.key] : obj.default}`
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedColor(`${formData ? formData[obj.key] : obj.default}`));
  }, [dispatch, formData, obj]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSelectedColor(color.hex));
    }, 500);
    return () => {
      timer && clearTimeout(timer);
    };
  }, [dispatch, color]);

  return (
    <ColorPicker
      width={395}
      height={128}
      color={color}
      onChange={setColor}
      hideHSV
      dark
      hideHEX
      hideRGB
    />
  );
}

export default ColorSelector;
