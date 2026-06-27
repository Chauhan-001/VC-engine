import {
  Bolt,
  Shield,
  PartyPopper,
  Globe,
} from "lucide-react";

function Features() {
  const features = [
    {
      title: "FAST",
      icon: Bolt,
      description:
        "No server latency. All operations happen instantly on your device's hardware.",
    },

    {
      title: "PRIVATE",
      icon: Shield,
      description:
        "Your files never leave your computer. Privacy is guaranteed by design.",
    },

    {
      title: "FREE",
      icon: PartyPopper,
      description:
        "No subscriptions. No hidden paywalls. Pure utility for everyone.",
    },

    {
      title: "BROWSER POWERED",
      icon: Globe,
      description:
        "Compatible with any modern browser. No installation or setup required.",
    },
  ];

  return (
    <section className="border-y-[3px] border-black bg-[#111111] py-20">
      <div className="mx-auto grid max-w-[1280px] gap-6 px-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
                group
                border-[3px]
                border-black
                bg-[#1a1a1a]
                p-6
                shadow-[4px_4px_0px_0px_#0066ff]
                transition-all
                duration-200
                hover:-translate-x-1
                hover:-translate-y-1
                hover:shadow-[8px_8px_0px_0px_#0066ff]
              "
            >
              {/* ICON */}
              <Icon
                size={40}
                className="
                  mb-4
                  text-[#0066ff]
                  transition-colors
                  duration-200
                  group-hover:text-white
                "
              />

              {/* TITLE */}
              <h4
                className="
                  mb-2
                  font-mono
                  text-lg
                  font-bold
                  uppercase
                  text-white
                "
              >
                {feature.title}
              </h4>

              {/* DESCRIPTION */}
              <p className="text-sm leading-6 text-gray-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;