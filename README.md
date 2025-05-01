<br/>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780157/Personal%20Logo/logo-white_e6fujz.png">
  <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png">
  <img alt="Siam Ahnaf" src="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png" height="auto" width="240">
</picture> 
<br/> <br/>

# @siamf/react-color-pick
An easy to use canva style react color picker tool.

<a href="https://www.buymeacoffee.com/siamahnaf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

- Highly customizable
- Easy to use
- Tailwind and non-tailwind support

# Demo

See the live demo from [here](https://react-color-pick-docs.vercel.app/)

# Installation

```bash
$ npm i @siamf/react-color-pick
```

# Usage
```javascript
"use client"
import { useState } from "react";
import { ColorPicker } from "@siamf/react-color-pick";

const Sample = () => {
    const [color, setColor] = useState<string>("#C11FB5");

    return (
        <div>
            <ColorPicker
                value={color}
                onChange={(e) => setColor(e)}
            />
        </div>
    );
};

export default Sample;
```

# Styling (CSS)

If you are not using tailwind css please import the css file-

```javascript
import "@siamf/react-color-pick/dist/index.css"
```

If you are using tailwind css-

```css
@source "../../node_modules/@siamf/react-color-pick"; 

//Adjust the package path if need
```

# Available props

<table width="100%">
  <tr>
    <th> Name </th>
    <th> Description </th>
    <th> Type </th>
    <th> Default/Required </th>
  </tr>
  <tr>
    <td> value </td>
    <td> Default Color Value </td>
    <td> string </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> onChange </td>
    <td> Watch color change </td>
    <td> (color:string) => void </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> className </td>
    <td> Main Container className </td>
    <td> string </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> selectorClassName </td>
    <td> Color selector gradient box className </td>
    <td> string </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> selectorDotClassName </td>
    <td> Color selector dot className </td>
    <td> string </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> hueClassName </td>
    <td> Hue slider bar className </td>
    <td> string </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> hueSliderClassName </td>
    <td> Hue slider dot className </td>
     <td> string </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> colorPreviewClassName </td>
    <td> Color preview circle className </td>
    <td> string </td>
    <td> optional </td>
  </tr>
  <tr>
    <td> colorInputClassName </td>
    <td> Color input field className </td>
    <td> string </td>
    <td> optional </td>
  </tr>
   <tr>
    <td> eyeDropClassName </td>
    <td> Eye drop button className </td>
    <td> string </td>
    <td> optional </td>
  </tr>
</table>


# Stay in touch

- Author - [Siam Ahnaf](https://www.siamahnaf.com/)
- Website - [https://www.siamahnaf.com/](https://www.siamahnaf.com/)
- LinkedIn - [https://www.linkedin.com/in/siamahnaf/](https://www.linkedin.com/in/siamahnaf/)
- Github - [https://github.com/siamahnaf](https://github.com/siamahnaf)