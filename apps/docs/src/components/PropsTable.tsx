interface PropRow {
  name: string;
  description: string;
  type: string;
  required?: boolean;
}

const props: PropRow[] = [
  { name: "value", description: "Default / controlled color value", type: "string" },
  { name: "onChange", description: "Fires whenever the selected color changes", type: "(color: string) => void" },
  { name: "className", description: "Main container className", type: "string" },
  { name: "selectorClassName", description: "Color selector gradient box className", type: "string" },
  { name: "selectorDotClassName", description: "Color selector dot className", type: "string" },
  { name: "hueClassName", description: "Hue slider bar className", type: "string" },
  { name: "hueSliderClassName", description: "Hue slider dot className", type: "string" },
  { name: "colorPreviewClassName", description: "Color preview circle className", type: "string" },
  { name: "colorInputClassName", description: "Color input field className", type: "string" },
  { name: "eyeDropClassName", description: "Eye drop button className", type: "string" },
];

const PropsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-gradient text-white">
              <th className="text-left font-semibold py-3.5 px-5">Prop</th>
              <th className="text-left font-semibold py-3.5 px-5">Description</th>
              <th className="text-left font-semibold py-3.5 px-5 hidden sm:table-cell">Type</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p, i) => (
              <tr
                key={p.name}
                className={`${i % 2 === 0 ? "bg-white" : "bg-purple-50/40"} hover:bg-pink-50/60 transition`}
              >
                <td className="py-3 px-5 align-top">
                  <code className="font-mono text-[13px] font-semibold text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded-md">
                    {p.name}
                  </code>
                </td>
                <td className="py-3 px-5 text-purple-900/80">{p.description}</td>
                <td className="py-3 px-5 hidden sm:table-cell">
                  <code className="font-mono text-[12px] text-pink-700 bg-pink-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                    {p.type}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropsTable;
