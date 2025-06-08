function Button({ text, href, download }) {
  if (download) {
    return (
      <a href={href} download>
        <button className="bg-yellowCute text-offBlack px-4 py-2 rounded-[5px]">{text}</button>
      </a>
    );
  }
}

export default Button;