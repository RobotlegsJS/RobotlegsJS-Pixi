// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/*============================================================================*/
/* Public Functions                                                           */
/*============================================================================*/

/**
 * Determines whether the specified child object is a child of the containter instance or the instance itself.
 * The search includes the entire display list including the containter instance.
 * Grandchildren, great-grandchildren, and so on each return true.
 *
 * @param container The container.
 * @param child The child object to test.
 *
 * @return true if the child object is a child of the container or the container itself; otherwise false.
 */
export function contains(container: any, child: any): boolean {
    let found: boolean = false;
    if (container === child || container.children.indexOf(child) >= 0) {
        found = true;
    } else {
        for (let c of container.children) {
            if (this.contains(c, child)) {
                found = true;
                break;
            }
        }
    }
    return found;
}
