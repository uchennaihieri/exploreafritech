import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { SectionProps } from '../utils/SectionProps';
import Image from '../components/elements/Image';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const propTypes = {
    ...SectionProps.types
}

const defaultProps = {
    ...SectionProps.defaults
}


function Startups({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    pushLeft,
    ...props
}) {

    const [allstartUps, setAllstartUps] = useState(null)

    const outerClasses = classNames(
        'testimonial section',
        topOuterDivider && 'has-top-divider',
        bottomOuterDivider && 'has-bottom-divider',
        hasBgColor && 'has-bg-color',
        invertColor && 'invert-color',
        className
    );

    const innerClasses = classNames(
        'testimonial-inner section-inner',
        topDivider && 'has-top-divider',
        bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
        'tiles-wrap',
        pushLeft && 'push-left'
    );


    useEffect(() => {

        const unsubscribe = onSnapshot(query(collection(db, "startups"), orderBy('dateAdded', 'desc')), (snapshot) => {
            const startUps = [];
            snapshot.forEach((docu) => {


                startUps.push({ id: docu.id, ...docu.data() });
            });
            setAllstartUps(startUps);
        });

        return unsubscribe
    }, [])

    console.log(allstartUps)

    return (
        <section

            {...props}
            className={outerClasses}>

            <div className="container">
                <div className={innerClasses}>
                    <div className={tilesClasses}>
                        {allstartUps && allstartUps.map((one, index) => {
                            return <div key={index} className="tiles-item " data-reveal-delay="200">

                                <Image
                                    src={one.imagePitch}
                                    alt="Open"
                                    width={'100%'}
                                    height={'100%'}
                                />

                                <div className="">
                                    <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                                        <span className="testimonial-item-name text-color-high">{one.location}</span>
                                        <span className="text-color-low"> / </span>
                                        <span className="testimonial-item-link">
                                            <a target="_blank" href={one.siteUrl} rel="noopener noreferrer">{one.name}</a>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}




Startups.propTypes = propTypes;
Startups.defaultProps = defaultProps;

export default Startups