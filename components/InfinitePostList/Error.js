
export default (props) => (
  <div>
    <style jsx>{`
      a, h3, .card-error{
        color: #fff;
        background-color: #ff3860;
      }
      a {
        text-decoration: underline;
      }
    `}</style>
      <div className="card card-error">
      <div className="card-content ">
        <h3>มีบางอย่างไม่ปกติจ้า</h3>
        <p>เปิดดูที่ console เลยจ้า มีโอกาสถูกล็อกที่ Firebase free quotas ต่อวัน T_T</p>
        <p><a href="https://firebase.google.com/docs/firestore/quotas#free-quota">อ่านเพิ่มเติมได้เลยจ้า</a></p>
      </div>
    </div>

  </div>
)
