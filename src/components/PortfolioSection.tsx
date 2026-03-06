import { motion } from "framer-motion";
import { Users, FileText, BarChart3, CheckCircle2 } from "lucide-react";

const projects = [
  {
    icon: Users,
    title: "Automação Inteligente de Gestão de Reclamações",
    description:
      `Esta solução foi desenvolvida para ajudar empresas a organizar e gerenciar reclamações recebidas por diferentes canais de atendimento.

O sistema centraliza automaticamente mensagens vindas de plataformas como WhatsApp, e-mail, formulários do site, redes sociais e portais de avaliação, garantindo que nenhuma solicitação importante seja perdida ou esquecida.

Utilizando inteligência artificial, a solução analisa o conteúdo das mensagens, identifica o tipo de problema, classifica a solicitação e direciona automaticamente cada caso para o fluxo adequado de atendimento.

Todas as informações podem ser integradas ao CRM ou a outras ferramentas utilizadas pela empresa, permitindo acompanhar o histórico de cada cliente, organizar os atendimentos e garantir maior controle sobre a resolução das demandas.

Com essa automação, as equipes de atendimento deixam de lidar com processos manuais e passam a trabalhar com informações organizadas, priorizando os casos mais importantes e respondendo aos clientes com mais agilidade.`,
    benefits: [
  "Centralização de reclamações de múltiplos canais",
  "Classificação automática de solicitações com IA",
  "Integração com CRM e ferramentas de atendimento",
  "Maior organização no processo de atendimento",
  "Redução do tempo de resposta aos clientes",
    ],
    video: "public/videos/projeto_reclamacao.mp4",
  },
  {
    icon: FileText,
    title: "Automação de Processamento de Documentos",
    description:
      "Muitas empresas gastam horas digitando manualmente informações de documentos recebidos por e-mail, como notas fiscais, pedidos, contratos ou relatórios.\n\nEsta automação processa e-mails recebidos, identifica anexos e utiliza extração inteligente de dados para capturar automaticamente as informações importantes.\n\nOs dados extraídos podem ser enviados diretamente para sistemas internos, planilhas ou bancos de dados, eliminando tarefas repetitivas e reduzindo erros operacionais.",
    benefits: [
      "Elimina digitação manual de dados",
      "Reduz erros operacionais",
      "Processa documentos automaticamente",
      "Integra dados com sistemas internos",
      "Economiza tempo das equipes operacionais",
    ],
    video: "public/videos/automacao_documentos.mp4",
  },
  {
    icon: BarChart3,
    title: "Automação Inteligente de Atendimento",
    description:
      "Este projeto demonstra um sistema completo de automação de atendimento para empresas que precisam organizar a comunicação com clientes e reduzir tarefas operacionais repetitivas.\n\nA solução utiliza automação e inteligência artificial para atender clientes automaticamente, responder dúvidas frequentes, realizar agendamentos e enviar lembretes de compromissos.\n\nO sistema pode ser integrado a canais como WhatsApp, sites ou outras plataformas de comunicação, permitindo que empresas ofereçam atendimento rápido e organizado sem depender exclusivamente de atendimento manual.\n\nAlém de melhorar a experiência do cliente, a automação reduz o tempo gasto pela equipe com tarefas operacionais e diminui falhas no processo de agendamento.",
    benefits: [
      "Redução da carga de trabalho da equipe",
      "Atendimento mais rápido e disponível 24/7",
      "Menos faltas em compromissos devido a lembretes automáticos",
      "Organização centralizada dos agendamentos",
      "Melhor experiência para os clientes",
    ],
    video: "public/videos/projeto_agendamento.mp4",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding bg-secondary">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            <span className="gradient-text">Portfólio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Desenvolvemos soluções de automação personalizadas para cada negócio.
          </p>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Abaixo estão algumas soluções que criamos e que ajudaram empresas a melhorar processos, aumentar produtividade e operar com mais eficiência.
          </p>    

          
        </motion.div>

        {/* Projects */}
        <div className="flex flex-col gap-24">
          {projects.map((project, i) => {
            const isReversed = i % 2 !== 0;

            return (
              <motion.div
                key={project.title}
                className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Text side */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <project.icon size={22} className="text-accent" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      Solução {i + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-4">
                      {project.title}
                  </h3>

                  {project.description.split("\n\n").map((paragraph, pi) => (
                    <p
                      key={pi}
                      style={{ textAlign: "justify" }}
                      className="text-muted-foreground text-sm leading-relaxed mb-3"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Features */}
                  {'features' in project && project.features && (
                    <div className="mt-5">
                      <span className="text-sm font-semibold text-foreground mb-3 block">
                        Funcionalidades principais:
                      </span>
                      <ul className="space-y-2">
                        {(project as any).features.map((f: string) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  <div className="mt-5">
                    <span className="text-sm font-semibold text-foreground mb-3 block">
                      Benefícios para o negócio:
                    </span>
                    <ul className="space-y-2">
                      {project.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Video side */}
                <div className="flex-1 w-full">
                  <div className="glass-card overflow-hidden rounded-2xl shadow-lg">
                    <div className="relative w-full">
                      <video 
                        className="w-full rounded-xl shadow-lg"
                        controls
                        autoPlay
                        muted
                        loop
                      >
                        <source src={project.video} type="video/mp4" />
                        Seu navegador não suporta vídeo.
                      </video>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
