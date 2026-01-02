<br/>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/logo/logo-white.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/logo/logo-black.png">
  <img alt="Siam Ahnaf" src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/logo/logo-black.png" height="auto" width="240">
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

If you are not using tailwind css, import the css file-

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


## Connect with me
<div style="display: flex; align-items: center; gap: 3px;">
<a href="https://wa.me/8801611994403"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/whatsapp.png" width="40" height="40"></a>
<a href="https://siamahnaf.com/" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/web.png" width="40" height="40"></a>
<a href="https://www.linkedin.com/in/siamahnaf/" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/linkedin.png" width="40" height="40"></a>
<a href="https://x.com/siamahnaf198" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/x.png" width="40" height="40"></a>
<a href="https://www.facebook.com/siamahnaf198/" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/facebook.png" width="40" height="40"></a>
<a href="https://t.me/siamahnaf198" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/telegram.png" width="40" height="40"></a>
<a href="https://www.npmjs.com/~siamahnaf" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/npm.png" width="40" height="40"></a>
</div>