import { FaGithub } from 'react-icons/fa';

const Footer = (props) =>
  <footer class="footer">
    <div class="content has-text-centered is-size-6">
      {/* <div>Copyright © 2018 by TechNukrom</div> */}
      <div class="is-size-7">Powered by <a href="https://nextjs.org/">NextJS</a></div>
      <div class="box user-link is-size-5">
        <a class="user-link" href="https://github.com/TechNukrom/"><FaGithub/></a>
      </div>
    </div>
  </footer>

export default Footer
