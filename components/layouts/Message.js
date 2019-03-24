
export default (props) => (
  <div>
    <style jsx>{`
      a, h4, .card-message{
        background-color: #E3F2FD;
      }
      a {
        text-decoration: underline;
      }
    `}</style>
      <div className="card card-message">
      <div className="card-content ">
        {props.children}
      </div>
    </div>

  </div>
)
