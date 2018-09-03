import Base from '../components/layouts/Base'
import Link from 'next/link'
export default () => (
  <Base title="ร่วมพัฒนา">
    <blockquote>ร่วมกันพัฒนา สร้างสังคม แห่งการแบ่งปัน</blockquote>

    <p>
      ถ้าสนใจร่วมพัฒนา ตอนนี้ ยังมีรายละเอียดยม่มาก 
      โดยในเบื้องต้นสามารถส่งมาที่<a href="mailto:mildronize@gmail.com">เมลผม</a>ได้ครับ เรื่อง Document และ design จะทยอยใส่ครับ 
       เพื่อเป็น open source ที่ดี
    </p>

    <h2>Need Help</h2>
    <ul>
      <li>แหล่งข้อมูลภาษาไทย ทุกที่</li>
      <li>ค่า Domain </li>
      <li>ค่า Hosting (อาจจะมีในอนาคต ถ้าระบบใหญ่มากกว่านี้)</li>
    </ul>
    อ่านข้อมูลเพิ่มเติมได้ที่ <a href="/roadmap">Road Map</a>
    <Link href="/roadmap"><a>Road Map</a></Link>
  </Base>
)
