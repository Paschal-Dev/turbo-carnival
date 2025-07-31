// src/components/Programs.tsx
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const programs = [
  {
    title: 'Primary Education',
    description:
      'Our Primary Education program is designed to ignite a lifelong passion for learning in young students, fostering intellectual curiosity and building a robust academic foundation. We offer a comprehensive curriculum that emphasizes core subjects such as reading, writing, mathematics, and science, delivered through interactive and engaging teaching methods. Our dedicated educators create a nurturing environment where students feel supported to explore their interests, develop critical thinking skills, and build confidence. Small class sizes ensure personalized attention, allowing each child to progress at their own pace. Beyond academics, we incorporate activities like storytelling, hands-on science experiments, and group projects to cultivate creativity, collaboration, and problem-solving abilities. Our goal is to prepare students not only for academic success but also for personal growth, equipping them with the tools to become curious, compassionate, and capable individuals ready to take on future challenges.',
  },
  {
    title: 'Secondary Education',
    description:
      'The Secondary Education program at Gold Stream Academy is tailored to prepare students for higher education and leadership roles in an increasingly complex world. Our advanced curriculum spans sciences, humanities, mathematics, and technology, with a strong emphasis on critical thinking, research, and analytical skills. Students engage in rigorous coursework, including Advanced Placement options, to challenge their intellect and broaden their perspectives. We integrate leadership training through initiatives like student government, debate clubs, and community service projects, fostering skills in communication, teamwork, and decision-making. Our experienced faculty provide mentorship to guide students toward their academic and career goals, whether they aspire to attend top universities or pursue vocational paths. Extracurricular opportunities, such as science fairs, literary journals, and tech innovation challenges, allow students to apply their learning in real-world contexts. With a focus on holistic development, we ensure students graduate as confident, well-rounded individuals ready to make a positive impact.',
  },
  {
    title: 'Sports Programs',
    description:
      'Our Sports Programs are a cornerstone of Gold Stream Academy, promoting physical fitness, teamwork, discipline, and resilience through a wide range of athletic activities. Students can participate in sports such as soccer, basketball, track and field, volleyball, and swimming, all supported by state-of-the-art facilities and professional coaches who emphasize both skill development and sportsmanship. We offer competitive teams for those aiming to excel in regional and national tournaments, as well as recreational leagues for students who want to stay active and have fun. Our programs include specialized training sessions, fitness workshops, and nutrition guidance to support overall wellness. Beyond physical benefits, sports at Gold Stream Academy teach students valuable life lessons, such as perseverance, leadership, and the importance of collaboration under pressure. Whether a student is a budding athlete or simply enjoys staying active, our inclusive programs ensure everyone finds a place to thrive and grow.',
  },
  {
    title: 'Arts and Music',
    description:
      'The Arts and Music program at Gold Stream Academy is dedicated to nurturing creativity, self-expression, and cultural appreciation through a diverse range of artistic disciplines. Students can explore painting, sculpture, drama, vocal performance, and instrumental music in our well-equipped studios and performance spaces. Our experienced instructors guide students through hands-on projects, from creating vibrant artworks to staging theatrical productions and performing in orchestras or choirs. We host annual showcases, art exhibitions, and concerts, giving students opportunities to display their talents to the community. The program also includes workshops on art history, music theory, and performance techniques, helping students develop a deeper understanding of their craft. By fostering an environment where creativity is celebrated, we empower students to build confidence, think innovatively, and express their unique voices. Whether pursuing art professionally or as a hobby, students leave our program with a lifelong appreciation for the arts.',
  },
  {
    title: 'STEM Enrichment',
    description:
      'Our STEM Enrichment program immerses students in the exciting worlds of science, technology, engineering, and mathematics, preparing them for innovation-driven careers in a rapidly evolving global landscape. Through hands-on projects like robotics design, coding bootcamps, and engineering challenges, students develop practical skills in problem-solving, critical thinking, and collaboration. Our state-of-the-art labs provide access to cutting-edge tools, including 3D printers, microcontrollers, and software development platforms. We partner with industry professionals and universities to offer guest lectures, mentorship, and real-world project opportunities, such as building sustainable energy models or developing mobile apps. The program also emphasizes interdisciplinary learning, integrating concepts like data science and environmental engineering to address global challenges. Whether students aim to become software engineers, scientists, or entrepreneurs, our STEM program equips them with the knowledge, creativity, and confidence to lead in the fields of tomorrow.',
  },
];

const Programs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 120000, // 2 minutes
    arrows: true,
    pauseOnHover: true,
    cssEase: 'ease-in-out',
    appendDots: (dots: React.ReactNode) => (
      <Box sx={{ mt: 2, '& ul': { display: 'flex', justifyContent: 'center', gap: 1 } }}>
        {dots}
      </Box>
    ),
    customPaging: () => (
      <Box
        sx={{
          width: 12,
          height: 12,
          bgcolor: 'primary.main',
          borderRadius: '50%',
          cursor: 'pointer',
          '&.slick-active': { bgcolor: 'primary.dark' },
        }}
      />
    ),
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }} id="programs">
      <Container>
        <Typography
          mt={8}
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Our Programs
        </Typography>
        <Box sx={{ maxWidth: '800px', mx: 'auto', px: { xs: 2, md: 0 } }}>
          <Slider {...settings}>
            {programs.map((program, index) => (
              <Box key={index} sx={{ px: 3 }}>
                <Card
                  sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    bgcolor: 'white',
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    border: '1px solid',
                    borderColor: 'primary.light',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    animation: 'fadeIn 0.5s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
                    },
                    minHeight: '400px', // Ensure room for longer descriptions
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 5, px: 3 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: 'primary.main', fontWeight: 'bold' }}
                    >
                      {program.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {program.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Programs;