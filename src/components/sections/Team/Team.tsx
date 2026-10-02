import styles from './Team.module.css';
import { Button } from '../../ui/Button/Button';
import { CALENDLY_URL, STONY_CALENDLY_URL } from '../../../config/site';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo: string;
  body: string[];
  quote: string;
  calendlyUrl?: string;
};

const team: TeamMember[] = [
  {
    id: 'rene-broussard',
    name: 'Rene Broussard',
    role: 'Accredited Investment Fiduciary® · Federal Retirement Consultant',
    photo: '/images/team/rene.jpg',
    body: [
      'Rene Broussard is an Accredited Investment Fiduciary® and Federal Retirement Consultant who helps individuals, families, federal employees, business owners, and high-net-worth clients build clear, practical strategies for retirement and long-term financial confidence.',
      'Rene takes a holistic approach by helping clients connect the major pieces of their financial life — income, taxes, investments, federal benefits, insurance, legacy goals, and long-term retirement needs — into one coordinated strategy. His style is clear, educational, and strategic, giving clients the guidance they need without unnecessary complexity.',
      'Outside of work, Rene enjoys traveling, spending time at the beach, following sports of all types, and being with family.',
    ],
    quote:
      'A strong retirement plan is not just about growing money — it is about protecting what you have built, creating dependable income, and making confident decisions for the future.',
    calendlyUrl: CALENDLY_URL,
  },
  {
    id: 'stony-burks',
    name: 'Stony Burks',
    role: 'Federal Retirement Consultant · Retirement Income Planning Specialist',
    photo: '/images/team/stony.jpg',
    body: [
      'Stony Burks is a Retirement Income Planning Specialist who helps individuals, families, and federal employees build clear, practical retirement strategies. His focus includes retirement income planning, TSP planning, Social Security timing, annuities, life insurance, and long-term financial protection.',
      'Stony takes a holistic approach to retirement planning by helping clients connect income, taxes, risk, insurance, legacy goals, and future retirement needs into one coordinated plan. His style is clear, educational, and straightforward, giving clients the clarity they need to make confident financial decisions.',
      'Outside of work, Stony enjoys fishing, golf, and spending time with family.',
    ],
    quote:
      'A meaningful retirement plan is not just about numbers — it is about creating dependable income, making smart decisions, and moving forward with confidence.',
    calendlyUrl: STONY_CALENDLY_URL,
  },
  {
    id: 'jerry-watkins',
    name: 'Jerry Watkins',
    role: 'Retirement Income Planning Specialist',
    photo: '/images/team/jerry.jpg',
    body: [
      'Jerry Watkins is a Retirement Income Planning Specialist who helps individuals, families, and federal employees create clear, practical retirement strategies. His focus includes retirement income planning, TSP planning, Social Security timing, annuities, life insurance, and long-term financial protection.',
      'Jerry takes a holistic approach by helping clients connect the major pieces of their financial life — income, taxes, risk, insurance, legacy goals, and future retirement needs — into one coordinated plan. His process is direct, educational, and numbers-driven to help clients make confident decisions without unnecessary complexity.',
      'Outside of work, Jerry enjoys fishing and spending time with family.',
    ],
    quote:
      "A strong retirement plan isn't about guessing what the future holds — it's about building the right strategy today for the life you want tomorrow.",
  },
  {
    id: 'anthony-garza',
    name: 'Anthony Garza',
    role: 'Client Relations Specialist',
    photo: '/images/team/anthony.jpg',
    body: [
      'Anthony Garza is a Client Relations Specialist who is passionate about creating positive experiences and building meaningful client relationships. He helps ensure every interaction is friendly, efficient, and supportive, giving clients the confidence that they are valued and well taken care of.',
      'Whether he is answering questions, coordinating appointments, or helping guide clients through the next steps, Anthony focuses on making the process as smooth and straightforward as possible. His style is approachable, responsive, and service-driven, helping clients feel informed, comfortable, and supported throughout the process.',
    ],
    quote:
      'Exceptional service is about making every client feel heard, supported, and confident in every step forward.',
  },
];

export default function Team() {
  return (
    <section className={styles.section} id="team" aria-labelledby="team-heading">
      <div className={styles.header}>
        <h1 className={styles.title} id="team-heading">
          Meet <em>the team</em>
        </h1>
        <p className={styles.desc}>
          Experienced professionals dedicated to your financial success.
        </p>
      </div>

      <div className={styles.list}>
        {team.map((m) => (
          <article key={m.id} className={styles.card}>
            <div className={styles.photoWrap}>
              <img
                src={m.photo}
                alt={`Portrait of ${m.name}`}
                className={styles.photo}
                loading="lazy"
                width="629"
                height="963"
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.name}>{m.name}</h3>
              <div className={styles.role}>{m.role}</div>
              <div className={styles.divider} aria-hidden="true" />
              {m.body.map((p, i) => (
                <p key={i} className={styles.body}>{p}</p>
              ))}
              <div className={styles.divider} aria-hidden="true" />
              <blockquote className={styles.quote}>
                <span className={styles.quoteMark} aria-hidden="true">“</span>
                <span className={styles.quoteText}>{m.quote}</span>
              </blockquote>
              {m.calendlyUrl && (
                <div className={styles.cta}>
                  <Button href={m.calendlyUrl} variant="primary" target="_blank" rel="noopener noreferrer">
                    Schedule a Call with {m.name.split(' ')[0]}
                  </Button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
