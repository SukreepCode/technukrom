import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const pagePath = '/page/';

export default (props) => (
  <div>
    <div class="columns is-mobile has-text-centered	">
      <div class="column"></div>
      <div class="column is-8">
        {props.page != "1" && <Link href={`${pagePath}${parseInt(props.page) - 1}`}><a class="button is-primary"><FaArrowLeft />Previous</a></Link>}
        {' '}
        <Link href={`${pagePath}${parseInt(props.page) + 1}`}><a class="button is-primary">Next<FaArrowRight /></a></Link>
      </div>
      <div class="column"></div>
    </div>
  </div>
)
