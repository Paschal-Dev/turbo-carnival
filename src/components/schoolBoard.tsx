import { Box, Container, Typography, useMediaQuery, useTheme, Avatar } from '@mui/material';

const SchoolBoard = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));

  const boardMembers = [
    {
      name: 'Charles Edeki',
      role: 'Founder',
      bio: 'Charles is a sports, education, child and social welfare enthusiast. He has spent the last 28 years adding value to the lives of orphans, widows, prostitutes and the underprivileged in all welfare-related endeavours ranging from education, medical, accommodation, business empowerment and skill acquisition, especially through his local church "The House On The Rock", Lagos Nigeria. He is a lawyer by profession and has progressed through Aluko & Oyebode, Lagos Nigeria; FM. Ebofuame-Nezan & Co, Makurdi; Olayinka Faji & Associates, Lagos; Ajumogobia & Okeke, Lagos; Celtel Nigeria Limited (Zain/Airtel) Lagos, Nigeria; and Emerging Markets Telecommunications Services (Etisalat/9-Mobile), Lagos, Nigeria. Mr Edeki is currently in law practice and remains a member of the Nigerian Bar Association, as well as the Chartered Institute of Taxation of Nigeria. A great team player, leader and mentor, he is an ardent sports fan and plays football for leisure. He is married to a beautiful wife, Adebukola and they have four lovely children.'
    },
    {
      name: 'Blessing Thomas-Amidu',
      role: 'Co-founder',
      bio: 'Blessing is a veteran in Nigeria\'s oil & gas industry. She holds a degree in Geology from the University of Benin. Blessing is also the Executive Producer of Nigeria\'s first feature length animation movie titled, "Ladybuckit & the Motley Mopsters". The movie made its cinematic debut in December 2020 and received accolades from reputable publications across the globe. She is a voracious reader who also enjoys watching movies in her spare time. Blessing resides in Nigeria with her four lovely children and two dogs.'
    },
    {
      name: 'Ola Opesan',
      role: 'Education Learner',
      bio: 'Mr Opesan\'s passion for education stems from his natural curiosity and insatiable appetite for learning. He has facilitated training for teachers, parents and students in Europe and Africa. Most of these seminars have been delivered in educational institutions such as Meadow Hall, Day Waterman College and Cambridge University, UK, as well as for organisations such as APEN (Association of Private Educators in Nigeria), House on the Rock (HOTR) and BEC (British Education Consultants). Ola Opesan is a highly sought-after trainer in the educational sphere. He currently works as a consultant for Maxpot. His mode of delivery is learner-centred. He is a published author, a playwright and a keen sportsperson. He has a son and a daughter, both of whom work in London. Mr Opesan has served AISEN (Association of International School Educators of Nigeria) in several capacities, first as CEO, then as Vice-Chair and also as the coordinating Principal of the Student Activities group. Over the last decade, he was instrumental in introducing new activities to the AISEN calendar, such as the parliamentary style of debate, coding competition, animation contest and a spoken word competition for international schools.'
    },
    {
      name: 'Mide Sofoluwe',
      role: '',
      bio: 'Mide is a social advocate for the young generation. Although a graduate of Architecture with both Bachelor and Masters degrees from University of Jos, she veered into the wonderful world of children in 2003. By 2007, she was fully in the educational field and consequently undertook a diploma course in Montessori Education in 2009. She thoroughly enjoys working with children and has strong interest in Pastoral Care, nurturing young minds and giving guidance towards a purposeful and balanced adulthood. An excellent administrator and driven reformer, she is the Managing Director at Olives\' Nest, a nursery and primary school in Lagos, Nigeria. For leisure, she enjoys nature, solving puzzles and making crafts.'
    },
    {
      name: 'Grace Edwin-Okon',
      role: '',
      bio: 'A Delta state, Nigeria born multi-talented, versatile, actor, script writer, film producer and author, she has been in the TV/FILM industry since 1999 and she is well respected for her skills. Her journey started in the world of beauty pageants while still an undergraduate at the Delta State University where she won the Miss Face of DELSU pageant. She moved on to become the second runner-up in the Most Beautiful Girl in Nigeria pageant (MBGN) in 1999. A graduate of English Language, she has featured in several movies and soap operas. Grace\'s love for children also influenced her first four audio visual productions. Grace\'s movies have won awards and recognitions including AMVCAs, Cross River State Merit Awards, Best of Nollywood Awards etc as most of Grace\'s movies are movies with social messages that impact lives and send out positive messages. Grace is the CEO of Derwin Productions, an organization dedicated to the production of educational and entertaining audio-visual productions for children and adults alike. She is also an IVLP alumnus (International Visitors leadership programme an exchange programme by the United States Government for leaders in various sectors) as well as an ambassador for "Hands up for her" since 2012 (an initiative centered on the welfare of the girl child). In addition, she is a Volunteer for "Green light Movies" (an initiative that teaches secondary school students about film making). Grace is a graduate of Watermark business school and she has attended writing and film making workshops with BBC and Ford Foundation.'
    }
  ];

  return (
    <Box
      id="school-board"
      sx={{
        py: mobile ? 4 : 8,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={mobile ? 4 : 6}>
          <Typography
            variant="h2"
            sx={{
              fontSize: mobile ? '2rem' : tablet ? '2.5rem' : '3rem',
              fontWeight: 900,
              color: 'primary.main',
              mb: 2
            }}
          >
            School Board
          </Typography>
          <hr
            style={{
              width: mobile ? '30%' : '20%',
              border: '1px solid',
              borderColor: 'primary.main',
              margin: '0 auto'
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {boardMembers.map((member, index) => (
            <Box
              key={index}
              sx={{
                width: mobile ? '100%' : 'calc(50% - 16px)',
                minWidth: mobile ? '100%' : '300px',
                backgroundColor: 'primary.main',
                borderRadius: 2,
                p: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                }
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'background.default',
                    mr: 2,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'primary.main'
                  }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: 'background.default'
                    }}
                  >
                    {member.name}
                  </Typography>
                  {member.role && (
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: 'background.default',
                        fontWeight: 600
                      }}
                    >
                      {member.role}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1.6,
                  fontSize: mobile ? '0.9rem' : '1rem'
                }}
              >
                {member.bio}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SchoolBoard;