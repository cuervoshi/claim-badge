import { BadgeDefinition } from '@/types/badge';
import { NDKEvent, NDKTag } from '@nostr-dev-kit/ndk';

export function convertToBadgeDefinition(badge: NDKEvent): BadgeDefinition {
  const badgeDefinition: BadgeDefinition = {
    id: badge.id,
    name: '',
    description: '',
    image: '',
    width: 0,
    height: 0,
  };

  const tags: NDKTag[] = badge.tags;

  tags.find((tag) => {
    // Name
    if (tag[0] === 'name') {
      badgeDefinition.name = tag[1];
    } else if (tag[0] === 'description') {
      badgeDefinition.description = tag[1];
    }
    // Image
    else if (tag[0] === 'image') {
      badgeDefinition.image = tag[1];

      const size = tag[1].split('x');

      badgeDefinition.width = parseInt(size[0]);
      badgeDefinition.height = parseInt(size[1]);
    }
  });

  return badgeDefinition;
}
