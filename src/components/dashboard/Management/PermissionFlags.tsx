import React, { useState } from "react";

export default function PermissionFlags() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpen((p) => ({ ...p, [key]: !p[key] }));

  interface ItemProps {
    id: string;
    label: string;
    children?: React.ReactNode;
  }

  // Expandable Section
  const Item: React.FC<ItemProps> = ({ id, label, children }) => (
    <div className="border-b py-3">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => toggle(id)}
      >
        <span className="text-lg border rounded w-5 h-5 flex items-center justify-center">
          {open[id] ? "−" : "+"}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-medium">
          {label}
        </span>
      </div>

      {open[id] && <div className="ml-8 mt-3">{children}</div>}
    </div>
  );

  // Checkbox style EXACT like your screenshot
  const Checkbox = ({ label }: { label: string }) => (
    <label className="flex items-center gap-2 my-1 cursor-pointer">
      <input type="checkbox" className="w-4 h-4" />
      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 text-sm rounded">
        {label}
      </span>
    </label>
  );

  return (
    <div className="p-6 text-sm space-y-4">

      {/* ======================== REAL ESTATE ======================== */}
      <Item id="realEstate" label="Real Estate">

        <Item id="settings" label="Settings">
          <Checkbox label="General Settings" />
          <Checkbox label="Currency Settings" />
          <Checkbox label="Account Settings" />
          <Checkbox label="Invoice Settings" />
          <Checkbox label="Invoice Template Settings" />
        </Item>

        <Item id="propertyFeatures" label="Property Features">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
        </Item>

        <Item id="consult" label="Consult">
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
        </Item>

        <Item id="accounts" label="Accounts">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
        </Item>

        <Item id="properties" label="Properties">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
          <Checkbox label="Export Properties" />
          <Checkbox label="Import Properties" />
        </Item>

        <Item id="investors" label="Investors">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
        </Item>

        <Item id="categories" label="Categories">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
        </Item>

        <Checkbox label="Verify accounts" />

        <Item id="projects" label="Projects">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
          <Checkbox label="Export Projects" />
          <Checkbox label="Import Projects" />
        </Item>

        <Item id="reviews" label="Reviews">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
        </Item>

        <Item id="facilities" label="Facilities">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
        </Item>

        <Item id="packages" label="Packages">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
        </Item>

        <Item id="invoices" label="Invoices">
          <Checkbox label="Edit" />
        </Item>
      </Item>

      {/* ======================== ADS ======================== */}
      <Item id="ads" label="Ads">
        <Checkbox label="Create" />
        <Checkbox label="Edit" />
        <Checkbox label="Delete" />
      </Item>

      {/* ======================== ANNOUNCEMENTS ======================== */}
      <Item id="ann" label="Announcements">
        <Checkbox label="Create" />
        <Checkbox label="Edit" />
        <Checkbox label="Delete" />
      </Item>

      {/* ======================== CMS ======================== */}
      <Item id="cms" label="CMS">
        <Item id="media" label="Media">
          <Item id="file" label="File">
            <Checkbox label="Create" />
          </Item>
          <Item id="folder" label="Folder">
            <Checkbox label="Create" />
          </Item>
        </Item>

        <Item id="pages" label="Pages">
          <Checkbox label="Create" />
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
        </Item>

        <Item id="blog" label="Blog">
          <Checkbox label="Create" />
        </Item>

        <Item id="contact" label="Contact">
          <Checkbox label="Edit" />
          <Checkbox label="Delete" />
          <Checkbox label="Custom Fields" />
        </Item>
      </Item>

      {/* ======================== CAREERS ======================== */}
      <Item id="careers" label="Careers">
        <Checkbox label="Create" />
        <Checkbox label="Edit" />
        <Checkbox label="Delete" />
      </Item>

      {/* ======================== FAQ ======================== */}
      <Item id="faq" label="FAQ">
        <Checkbox label="Create" />
        <Checkbox label="Edit" />
        <Checkbox label="Delete" />
      </Item>
    </div>
  );
}
