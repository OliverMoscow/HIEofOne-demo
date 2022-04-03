import Link from "next/link"
import styles from "./footer.module.css"
import packageJSON from "../package.json"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href="https://login.xyz/">Spruce</a>
        </li>
        <li className={styles.navItem}>
          <a href="https://hieofone.com/">HIE of One</a>
        </li>
        <li className={styles.navItem}>
          <a href="https://github.com/OliverMoscow/siwe-next">Code</a>
        </li>
      </ul>
    </footer>
  )
}
