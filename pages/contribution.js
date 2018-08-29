import Base from '../components/layouts/Base'
export default () => (
  <Base title="เกี่ยวกับเรา">
    <h1>ยังไม่มีความสามารถแบบที่หาอยู่? ช่วยกันสิ</h1>
    <hr />
    <blockquote>ร่วมกันพัฒนา สร้างสังคม แห่งการแบ่งปัน</blockquote>
    <h2 id="technologystack">Technology Stack</h2>
    <ul>
      <li><strong>Hosting</strong>: <a href="https://zeit.co/now">https://zeit.co/now</a> @ <a href="https://technukrom.now.sh/">Technukrom</a></li>
      <li><strong>Frontend Framework</strong>: <a href="https://nextjs.org/">Nextjs</a></li>
      <li><strong>DB &amp; Backend</strong>: Firestone by Firebase</li>
    </ul>
    <h2 id="todo">TODO</h2>
    <ul>
      <li>เขียน Readme</li>
      <li>เขียน Doc</li>
      <li>ทำ SEO</li>
    </ul>
    <h1 id="needhelp">Need Help</h1>
    <ul>
      <li>แหล่งข้อมูลภาษาไทย ทุกที่</li>
      <li>Logo design</li>
      <li>การออกแบบหน้าเว็บหลัก</li>
      <li>ค่า Domain </li>
      <li>ค่า Hosting (อาจจะมีในอนาคต ถ้าระบบใหญ่มากกว่านี้)</li>
    </ul>
    อ่านเพิ่มเติมได้<a href="https://github.com/TechNukrom/technukrom/issues/2">การพัฒนาแอพ Phase ที่ 1</a>
  </Base>
)
