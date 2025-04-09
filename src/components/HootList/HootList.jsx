import {Link} from 'react-router'

const HootList = (props) => {
    // console.log(props.hoots)

    return (
        <main>
            {props.hoots.map((hoot) => (
                <Link key={hoot._id} to={`/hoots/${hoot._id}`} >
                    <article>
                        <header>
                            <h2>{hoot.tile}</h2>
                            <p>{`${hoot.author.username} posted on 
                                ${new Date(hoot.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{hoot.text}</p>
                    </article>

                </Link>

            ))}
            
        </main>
    )
}

export default HootList;