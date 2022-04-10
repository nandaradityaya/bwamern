import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export default function Button(props) {
  const className = [props.className]; //di lempar dari komponen yang pake si button ini
  if (props.isPrimary) className.push("btn-primary");
  if (props.isLarge) className.push("btn-lg");
  if (props.isSmall) className.push("btn-sm");
  if (props.isBlock) className.push("btn-block");
  if (props.hasShadow) className.push("btn-shadow");

  const onClick = () => {
    if (props.onClick) props.onClick();
  }; // function utk ngehandle onClick

  if (props.isDisabled || props.isLoading) {
    if (props.isDisabled) className.push("disabled");
    return (
      <span className={className.join(" ")} style={props.style}>
        {props.isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm mx-5"></span>
            <span className="sr-only">Loading...</span>
          </> //ini tag reactFragment
        ) : (
          props.children //setelah kondisi di atas oke, balikin children yang ada.
        )}
      </span>
    );
  }

  if (props.type === "link") {
    if (props.isExternal) {
      return (
        <a
          href={props.href}
          className={className.join(" ")} //utk joinin value array yg masuk ke className yg di atas
          style={props.style} //kembaliin apa saja style yg ada, jadi gaperlu konfigurasi lagi
          target={props.target === "_blank" ? "_blank" : undefined}
          rel={
            props.target === "_blank" ? "noopener noreferrer" : undefined
          } /*fungsi noopener noreferrer utk SEO*/
        >
          {props.children}
        </a>
      );
    } else {
      return (
        //ini utk link ke dalem aplikasi
        <Link
          to={props.href} // to ini untuk arah tujuan linknya
          className={className.join(" ")} //utk joinin value array yg masuk ke className yg di atas
          style={props.style} //stylenya nanti dapet dari parent karena di lempar
          onClick={onClick}
        >
          {props.children}
        </Link>
      );
    }
  }

  return (
    <button
      className={className.join(" ")} //utk joinin value array yg masuk ke className yg di atas
      style={props.style}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.oneOf(["button", "link"]), //oneOf itu untuk hanya menerima property button & link
  onClick: propTypes.func, //harus ada proptypes function klo dia itu button
  href: propTypes.string,
  target: propTypes.string, //untuk link eksternal
  className: propTypes.string,
  isExternal: propTypes.bool,
  isDisabled: propTypes.bool, //property utk mengetahui apakah link tsb disabled
  isLoading: propTypes.bool, //property utk animasi loading
  isSmall: propTypes.bool,
  isLarge: propTypes.bool,
  isBlock: propTypes.bool,
  hasShadow: propTypes.bool, //untuk shadow pada button
};
