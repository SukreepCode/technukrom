import Base from '../components/layouts/Base'
import Link from 'next/link'
export default () => (
  <Base title="เกี่ยวกับเรา">
    <p>Technology + สารานุกรม = Techนุกรม</p>
    <h2 id="">เป้าหมาย</h2>
    <p><strong>Tech นุกรม</strong> = ศูนย์กลางความรู้สำหรับนักพัฒนา ( developer) โดยที่เน้นภาษาไทยเป็นหลัก (ถ้ามี)
เน้นเรื่องของ personalization เป็น ล็อกอินเข้ามาเพื่ออ่านในสิ่งที่เราสนใจ</p>
    <h2 id="-1">กลุ่มเนื้อหา</h2>
    <ul>
      <li>News</li>
      <li>Blogs </li>
      <li>Awesome</li>
      <li>Cheat sheet</li>
      <li>Documents</li>
      <li>Knowledge &amp; books</li>
      <li>Video</li>
    </ul>
    <h2>สนใจร่วมพัฒนา?</h2>
    <p>ตอนนี้รายละเอียดยังไม่มาก จะทยอยใส่เรื่อยๆ ครับ</p>
    <Link href="/contribution"><a>อ่านเพิ่มเติม</a></Link>
  </Base>
)
